import {
    ActivityIndicator,
    FlatList,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Picker,
  } from "react-native";
  import axios from "axios";
  import React, { useEffect, useState } from "react";
  import VendedoresScreen from "./Vendedores";

  
  
  export default function VentasScreen({ route }) {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [zona, setZona] = useState("");
    const [fecha, setFecha] = useState("");
    const [valorventa, setValorVenta] = useState("");
    const [idvend, setIdvend] = useState("");
    const ip = "http://192.168.1.14:3000";


    
    const saveVenta = async () => {
      if (!zona.trim() || !fecha.trim() || !valorventa.trim()) {
        alert("id vendedor, Zona, fecha y valor de la venta son obligatorios");
        return;
      }
      setLoading(true);
      try {
        const response = await axios.post(`${ip}/api/venta`, {
          idvend:VendedoresScreen.idvend,
          zona,
          fecha,
          valorventa,
          // comision
        });
        alert("venta creada correctamente.");
        setIdvend("");
        setZona("");
        setFecha("");
        setValorVenta("");
      } catch (error) {
        console.log(error);
      } finally {
        getVenta();
        setLoading(false);
      }
    };
    
    const getVenta = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${ip}/api/venta`);
        setData(response.data);
        setIdvend("");
        setZona("");
        setFecha("");
        setValorVenta("");
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
  
    const getVentaPorId = async (id) => {
      setLoading(true);
      try {
        const response = await axios.get(`${ip}/api/venta/${id}`);
        setData(response.data);
        setZona(response.data.zona);
        setFecha(response.data.fecha);
        setValorVenta(response.data.valorventa);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      //getUsers();
      getVenta();
    }, []);
  
   return (
      <View style={{ flex: 1, padding: 24 }}>
        <View>
          <TextInput
            placeholder="Ingrese cedula vendedor"
            style={styles.inputs}
            onChangeText={(idvend) => setIdvend(idvend)}
            value={idvend}
          />

          {/* <TextInput
            placeholder="Ingrese la zona"
            style={styles.inputs}
            onChangeText={(zona) => setZona(zona)}
            value={zona}
          />  */}

          <Picker
          style={[styles.inputs,{borderColor:'green'}]}
          selectedValue={zona}
          onValueChange={(itemValue) => setZona(itemValue)}>
                <Picker.Item label="Seleccione la zona" value="" />
                <Picker.Item label="Sur" value="sur" />
                <Picker.Item label="Norte" value="norte" />
          </Picker>

          <TextInput
            placeholder="Ingrese la fecha"
            style={styles.inputs}
            onChangeText={(fecha) => setFecha(fecha)}
            value={fecha}
          />
          <TextInput
            placeholder="Ingrese valor de la venta"
            style={styles.inputs}
            onChangeText={(valorventa) => setValorVenta(valorventa)}
            value={valorventa}
          />
          
          <TouchableOpacity
            style={[styles.buttons, { backgroundColor: "#1ABC9C" }]}
            onPress={() => getVentaPorId(idvend)}
          >
            <Text style={{ color: "white" }}>Buscar por ID</Text>
          </TouchableOpacity>
  
          <TouchableOpacity
            style={[styles.buttons, { backgroundColor: "#1ABC9C" }]}
            onPress={getVenta}
          >
            <Text style={{ color: "white" }}>Buscar todas ventas</Text>
          </TouchableOpacity>
  
          <TouchableOpacity
            style={[styles.buttons, { backgroundColor: "#1ABC9C" }]}
            onPress={saveVenta}
          >
            <Text style={{ color: "white" }}>Guardar</Text>
          </TouchableOpacity>
        </View>
        {isLoading ? (
          <ActivityIndicator size="large" color="black" />
        ) : (
          <FlatList
            data={data}
            //keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.buttons,
                  { backgroundColor: item.id % 2 == 1 ? "wheat" : "grey" },
                ]}
                onPress={() => {
                  if (
                    confirm(
                      `¿Está seguro de eliminar la venta  ?`
                    )
                  ) {
                    alert("Eliminado.");
                  }
                }}
              >
                <Text>cedula:{item.idvend} zona:{item.zona} venta: {item.valorventa}</Text>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    );

   
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#2C3333",
      alignItems: "center",
      justifyContent: "center",
    },
    buttons: {
      borderRadius: 10,
      padding: 10,
      justifyContent: "center",
      alignItems: "center",
      height: 40,
      marginBottom: 5,
    },
    inputs: {
      borderWidth: 2,
      borderColor: "green",
      borderRadius: 10,
      marginBottom: 5,
      textAlign: "center",
      padding: 5,
    },
  });
  