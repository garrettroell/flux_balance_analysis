import pandas as pd


# These functions turn json objects into dataframes. Should probably rename to reaction_json_to_df
def post_request_to_reaction_df(data):
    reaction_df = pd.DataFrame()
    reaction_df["id"] = [
        data["reactionData"][i]["id"] for i in range(len(data["reactionData"]))
    ]
    reaction_df["name"] = [
        data["reactionData"][i]["name"] for i in range(len(data["reactionData"]))
    ]
    reaction_df["reaction"] = [
        data["reactionData"][i]["reaction"] for i in range(len(data["reactionData"]))
    ]
    reaction_df["lower bound"] = [
        data["reactionData"][i]["lower bound"] for i in range(len(data["reactionData"]))
    ]
    reaction_df["upper bound"] = [
        data["reactionData"][i]["upper bound"] for i in range(len(data["reactionData"]))
    ]
    reaction_df["objective value"] = [
        data["reactionData"][i]["objective value"]
        for i in range(len(data["reactionData"]))
    ]
    return reaction_df


def post_request_to_metabolite_df(data):
    metabolite_df = pd.DataFrame()
    metabolite_df["id"] = [
        data["metaboliteData"][i]["id"] for i in range(len(data["metaboliteData"]))
    ]
    metabolite_df["name"] = [
        data["metaboliteData"][i]["name"] for i in range(len(data["metaboliteData"]))
    ]
    metabolite_df["formula"] = [
        data["metaboliteData"][i]["formula"] for i in range(len(data["metaboliteData"]))
    ]
    metabolite_df["compartment"] = [
        data["metaboliteData"][i]["compartment"]
        for i in range(len(data["metaboliteData"]))
    ]
    return metabolite_df