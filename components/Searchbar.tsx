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

  const handleSelection = (value: any) => {
    console.log(value);
    props.handleSelection(value);
  };

  console.log(props.options);
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
        options={props.options}
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
            //on={() => console.log("Clicked!!!!!")}
          />
        )}
        onChange={(event, value) => handleSelection(value)}
      />
    </View>
  );
}
