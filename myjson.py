import json

def read_json(name_file: str) -> dict:
    """
    Read and parse a JSON file.

    Args:
        name_file (str): The name of the JSON file to read.

    Returns:
        dict: The parsed JSON data.

    """
    with open(name_file, 'r') as f:
        data = json.load(f)
    return data

def write_json(data:object, name_file:str) -> bool:
    """
    Write JSON data to a file.

    Args:
        data (object): The data to be written as JSON.
        name_file (str): The name of the file to write the JSON data to.

    Returns:
        bool: True if the data was successfully written to the file, False otherwise.
    """
    try:
        with open(name_file, 'w', encoding='utf-8') as file:
            json.dump(data, file, indent=4)
        return True
    except:
        return False
    
if __name__ == "__main__":
    print("main")
    data = {
        "str": "json.json",
        "int": 10,
        "float": 20.5,
        "bool": True,
        "none": None,
        "list": [1, 2, 3],
    }
    data["dict"] = {"key": "value"}
    data["dict"] = {"key": "test"}
    name = data["str"]
    write_json(data, name)
    print(read_json(name))