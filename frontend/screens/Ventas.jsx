import {
    ActivityIndicator,
    FlatList,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    StyleSheet,
  } from "react-native";
  import axios from "axios";
  import React, { useEffect, useState } from "react";
  
  export default function VentasScreen({ route }) {
    const [isLoading, setLoading] = useState(true); //componente visual de carga, muestra una bolita cargando
    const [data, setData] = useState([]);
    const [zona, setZona] = useState("");
    const [fecha, setFecha] = useState("");
    const [valorventa, setValorVenta] = useState("");
    const [sid, setSid] = useState("");
    const ip = "http://172.18.60.92:3000";
  
    const saveVenta = async () => {
      if (!zona.trim() || !fecha.trim() || !valorventa.trim()) {
        alert("id vendedor, Zona, fecha y valor de la venta son obligatorios");
        return;
      }
      setLoading(true);
      try {
        const response = await axios.post(`${ip}/api/venta`, {
          zona,
          fecha,
          valorventa,
        });
        alert("venta creada correctamente.");
        setSid("");
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
        setSid("");
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
            placeholder="Ingrese ID"
            style={styles.inputs}
            onChangeText={(sid) => setSid(sid)}
            value={sid}
          />
          <TextInput
            placeholder="Ingrese la zona"
            style={styles.inputs}
            onChangeText={(zona) => setZona(zona)}
            value={zona}
          />
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
            onPress={() => getVentaPorId(sid)}
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
                <Text> venta: {item.valorventa}</Text>
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
  