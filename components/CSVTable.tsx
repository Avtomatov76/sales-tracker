import { View } from "react-native";
import { Button } from "react-native-paper";

export default function CSVTable(props: any) {
  return (
    <View style={{marginBottom: 40}}>
      <View>
        <table
          style={{
            border: "solid",
            borderWidth: 1,
            borderColor: "grey",
            paddingBottom: 10,
          }}
        >
          <thead style={{ padding: 5 }}>
            <tr
              style={{
                border: "solid",
                borderWidth: 1,
                borderColor: "red",
                backgroundColor: "grey",
                color: "#ffffff",
              }}
            >
              {props.tableRows.map((rows: any, index: any) => {
                return <th key={index}>{rows}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {props.values.map((value: any, index: any) => {
              return (
                <tr
                  key={index}
                  style={{ padding: 5, backgroundColor: "#f5f5f5" }} // "#fafafa"
                >
                  {value.map((val, i) => {
                    return (
                      <td style={{ paddingLeft: 5, paddingRight: 5 }} key={i}>
                        {val}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </View>
      <View
        style={{
          marginTop: 20,
          alignSelf: "flex-start",
          //backgroundColor: "purple",
        }}
      >
        <Button
          buttonColor="purple"
          textColor="#ffffff"
          style={{ paddingLeft: 10, paddingRight: 10 }}
          onPress={props.displayModal}
        >
          Save Customers
        </Button>
      </View>
    </View>
  );
}
