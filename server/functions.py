import cobra
# import cobra.test
import pandas as pd
import json
from post_request_to_data import *


def find_optimal_fluxes(data):
    print("started making model")

    model = post_data_to_model(data)

    print("made model, starting optimization")

    solution = model.optimize()
    df = pd.DataFrame(solution.fluxes)
    df.reset_index(inplace=True, drop=False)
    df.columns = ["id", "flux"]
    df["name"] = [id_to_name(model, row["id"]) for _, row in df.iterrows()]
    df["reaction"] = [id_to_reaction(model, row["id"]) for _, row in df.iterrows()]
    df = df.T
    json_output = df.to_json()
    print(json_output)
    return json_output


def post_data_to_model(data):
    model = cobra.Model("example_model")
    print("running post_request_to_reaction_df")
    reaction_df = post_request_to_reaction_df(data)
    print("running post_request_to_metabolite_df")
    metabolite_df = post_request_to_metabolite_df(data)
    print("running iterrows")
    for _, row in reaction_df.iterrows():
        reaction = cobra.Reaction(row["id"])
        reaction.name = row["name"]
        reaction.lower_bound = row["lower bound"]
        reaction.upper_bound = row["upper bound"]

        rxn = row["reaction"]
        rxn_tokens = row["reaction"].split(" ")  # get all tokens in reaction string
        # only get valid metabolites
        rxn_mets = [token for token in rxn_tokens if token in list(metabolite_df["id"])]
        # use function to get coefficients
        rxn_coeffs = [rnx_tokens_to_coeff(rxn_tokens, met_id) for met_id in rxn_mets]
        # make metabolite objects for each metabolite in reaction
        met_list = [met_id_to_list_item(met_id, metabolite_df) for met_id in rxn_mets]
        # make dictionary of metabolites and coefficients, and add to reaction
        reaction.add_metabolites(rxn_dict(met_list, rxn_coeffs))
        # add reaction to model
        model.add_reactions([reaction])

    # Set proper objective function
    for r in model.reactions:
        r.objective_coefficient = reaction_df[reaction_df["id"] == r.id][
            "objective value"
        ].values[0]

    return model


def id_to_name(model, _id):
    try:
        return model.reactions.get_by_id(_id).name
    except:
        return ""


def id_to_reaction(model, _id):
    try:
        return model.reactions.get_by_id(_id).reaction
    except:
        return ""


def rxn_dict(met_list, rxn_coeffs):
    rxn_dict = {}
    for met, met_coeff in zip(met_list, rxn_coeffs):
        rxn_dict[met] = met_coeff
    return rxn_dict


def rnx_tokens_to_coeff(rxn_tokens, met_id):
    met_index = rxn_tokens.index(met_id)
    try:
        divider_index = rxn_tokens.index("-->")
    except:
        pass
    try:
        divider_index = rxn_tokens.index("<=>")
    except:
        pass
    try:
        divider_index = rxn_tokens.index("<--")
    except:
        pass

    coeff = 1
    try:
        coeff = float(rxn_tokens[met_index - 1])
    except:
        pass

    if met_index < divider_index:
        coeff = -1 * coeff

    return coeff


def met_id_to_list_item(met_id, metabolite_df):
    met_info = metabolite_df[metabolite_df["id"] == met_id]
    return cobra.Metabolite(
        met_id,
        formula=met_info["formula"].values[0],
        name=met_info["name"].values[0],
        compartment=met_info["compartment"].values[0],
    )
