import { View, Text, StyleSheet } from "react-native";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { withStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  searchInput: {
    width: 300,
    fontSize: 12,
    placeholderTextColor: "grey",
    padding: ".5rem",
    marginLeft: ".5rem",
    outlineStyle: "none",
    borderRadius: 30,
    borderEndColor: "purple",
  },
});

export default function Searchbar(props: any) {
  const classes = useStyles();

  const custObjects = props.objects;
  const options = props.options;
  //console.log("Options: ", options);

  //
  // console.log("Customer Names: ", options);
  // console.log("Customer Objects: ", custObjects);
  //

  const handleSelection = (value: any, event: any) => {
    props.handleSelection(value);
  };

  const handleOnChange = () => {
    //console.log(params);
    props.onChange();
  };

  return (
    <View
    //style={styles.searchContainer}
    >
      <Autocomplete
        //style={styles.searchInput}
        //className={classes.searchInput}
        style={{ width: 300, color: "red" }}
        freeSolo
        autoComplete
        autoHighlight
        options={options}
        //includeInputInList={true}
        //filterOptions={custObjects}
        //options={custObjects}
        //onSelect={() => alert("Selected!!")}
        renderInput={(params) => (
          <TextField
            {...params}
            onChange={props.onChange}
            variant="outlined"
            label="Search by last name"
            //className={classes.searchInput}
            //style={{ borderWidth: 1, borderColor: "purple", borderRadius: 30 }}
            //color="primary"
            //onSelect={() => console.log("Clicked!!!!! ", params.id)}
          />
        )}
        onChange={(event, value) => handleSelection(value, event)}
      />
    </View>
  );
}
