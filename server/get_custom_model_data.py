import json
import cobra.io
import xml.etree.ElementTree as ET
import pandas as pd


def model_to_metabolite_json(model):
    output = pd.DataFrame()

    output["id"] = [m.id for m in model.metabolites]
    output["name"] = [m.name for m in model.metabolites]
    output["formula"] = [m.formula for m in model.metabolites]
    output["compartment"] = [m.compartment for m in model.metabolites]

    json_output = output.T.to_json()
    return json_output


def model_to_reaction_json(model):
    output = pd.DataFrame()

    output["id"] = [r.id for r in model.reactions]
    output["name"] = [r.name for r in model.reactions]
    output["reaction"] = [r.reaction for r in model.reactions]
    output["lower bound"] = [r.lower_bound for r in model.reactions]
    output["upper bound"] = [r.upper_bound for r in model.reactions]
    output["objective value"] = [r.objective_coefficient for r in model.reactions]

    json_output = output.T.to_json()
    return json_output


def get_custom_model_data(data):
    file_text = data["fileText"]
    try:
        model = cobra.io.json.from_json(file_text)
    except:
        try:
            model = cobra.io.sbml.read_sbml_model(file_text)
        except:
            return {"error": "unable to read file"}

    metabolite_json = model_to_metabolite_json(model)
    reaction_json = model_to_reaction_json(model)
    return {"metabolites": metabolite_json, "reactions": reaction_json}