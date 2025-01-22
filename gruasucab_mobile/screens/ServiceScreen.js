import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapContainer from './MapContainer'


const ServiceScreen = () => {

  const simulatedOrder = {
    serviceOrder: {
      serviceOrderId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      statusServiceOrder: "En Proceso",
      incidentDescription: "Accidente menor",
      initialLocationDriverLat: 10.48801,
      initialLocationDriverLon: -66.87919,
      incidentLocationLat: 10.50000,
      incidentLocationLon: -66.87000,
      incidentLocationEndLat: 10.51000,
      incidentLocationEndLon: -66.86000,
      incidentDistance: 5,
      customerVehicleDescription: "Toyota Corolla, Blanco",
      incidentCost: 150,
      policyId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      incidentDate: "2025-01-22",
      vehicleId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      driverId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      customerId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      operatorId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      serviceFeeId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <MapContainer order={simulatedOrder.serviceOrder} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: { 
    fontSize: 30, // Ajusta el tamaño según tus preferencias
    fontWeight: 'bold', 
    textAlign: 'left', // Justifica el texto a la izquierda
    flexGrow: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row', 
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  optionsButton: {
    padding: 10,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ServiceScreen;