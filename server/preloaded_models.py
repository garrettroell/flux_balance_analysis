import cobra
# import cobra.test
import pandas as pd
import json


def textbook_reactions(transpose=False):
    with open("data/ecoli_reactions.json") as f:
        data = json.load(f)
        print(data)
        return data


def textbook_metabolites(transpose=False):
    with open("data/ecoli_metabolites.json") as f:
        # print(f.read())
        data = json.load(f)
        print(data)
        return data


# Reaction and metabolite data are stored differently from one another. One has quotes and a lot of '\' characters
# while the other have to be dumped to be returned, not sure which is better. (Probably the one without dumps though)
def scerevisiae_reactions(transpose=False):
    with open("data/scerevisiae_reactions.json") as f:
        data = json.load(f)
        return json.dumps(data)


def scerevisiae_metabolites(transpose=False):
    with open("data/scerevisiae_metabolites.json") as f:
        # return json.dumps(f)
        data = json.load(f)
        return data
        # return json.dumps(data)


# This is code that was used to make the reactions/metabolites files.

# scerevisiae_reactions_str = scerevisiae_reactions(transpose=True)
# print(scerevisiae_reactions_str)
# print(type(scerevisiae_reactions_str))

# scerevisiae_metabolites_str = scerevisiae_metabolites(transpose=True)
# print(scerevisiae_metabolites_str)
# print(type(scerevisiae_metabolites_str))

# print("getting S. cerevisiae metabolites")
# model = cobra.io.load_json_model("s_cerevisiae_iND750.json")

# output = pd.DataFrame()

# output["id"] = [m.id for m in model.metabolites]
# output["name"] = [m.name for m in model.metabolites]
# output["formula"] = [m.formula for m in model.metabolites]
# output["compartment"] = [m.compartment for m in model.metabolites]

# if transpose:
#     output = output.T
# json_output = output.to_json()
# with open("scerevisiae_metabolites.json", "w", encoding="utf-8") as f:
#     json.dump(json_output, f, ensure_ascii=False, indent=4)
# return json_output


# print(data)
# print(type(data))
# return data
# model = cobra.io.load_json_model("s_cerevisiae_iND750.json")

# output = pd.DataFrame()

# output["id"] = [r.id for r in model.reactions]
# output["name"] = [r.name for r in model.reactions]
# output["reaction"] = [r.reaction for r in model.reactions]
# output["lower bound"] = [r.lower_bound for r in model.reactions]
# output["upper bound"] = [r.upper_bound for r in model.reactions]
# output["objective value"] = [r.objective_coefficient for r in model.reactions]

# if transpose:
#     output = output.T
# json_output = json.loads(output.to_json())

# print(json_output)
# print(type(json_output))
# with open("scerevisiae_reactions.json", "w", encoding="utf-8") as f:
#     json.dump(json_output, f, ensure_ascii=False, indent=4)
# print(json_output)
# return json_output
