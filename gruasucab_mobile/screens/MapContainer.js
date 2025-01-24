import React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps';

const MapComponent = ({ order }) => {

  const actualOrder = order;
  const initialRegion = {
    latitude: actualOrder.incidentLocationLatitude || 10.49400,
    longitude: actualOrder.incidentLocationLongitude || -66.87400,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };
  console.log(actualOrder);
  const mapStyle = [
    {
      elementType: 'labels.icon',
      stylers: [{ visibility: 'off' }],
    },
    {
      elementType: 'labels.text.fill',
      stylers: [{ visibility: 'on' }],
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [{ visibility: 'on' }, { color: '#ffffff' }],
    },
    {
      featureType: 'road',
    },
  ];

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={initialRegion}
        customMapStyle={mapStyle}
      >
        {actualOrder.initialLocationDriverLatitude && actualOrder.initialLocationDriverLongitude && (
          <Marker
            coordinate={{ latitude: actualOrder.initialLocationDriverLatitude, longitude: actualOrder.initialLocationDriverLongitude }}
            title="Conductor"
            description="Posición inicial del conductor"
          />
        )}
        {actualOrder.incidentLocationLatitude && actualOrder.incidentLocationLongitude && (
          <Marker
            coordinate={{ latitude: actualOrder.incidentLocationLatitude, longitude: actualOrder.incidentLocationLongitude }}
            title="Incidente"
            description="Ubicación del incidente"
          />
        )}
        {actualOrder.incidentLocationEndLatitude && actualOrder.incidentLocationEndLongitude && (
          <Marker
            coordinate={{ latitude: actualOrder.incidentLocationEndLatitude, longitude: actualOrder.incidentLocationEndLongitude }}
            title="Destino"
            description="Destino del incidente"
          />
        )}
        {actualOrder.incidentLocationLatitude && actualOrder.incidentLocationLongitude && actualOrder.incidentLocationEndLatitude && actualOrder.incidentLocationEndLongitude && (
          <Polyline
            coordinates={[
              { latitude: actualOrder.incidentLocationLatitude, longitude: actualOrder.incidentLocationLongitude },
              { latitude: actualOrder.incidentLocationEndLatitude, longitude: actualOrder.incidentLocationEndLongitude },
            ]}
            strokeColor="#000"
            strokeWidth={3}
          />
        )}
        {actualOrder.initialLocationDriverLatitude && actualOrder.initialLocationDriverLongitude && actualOrder.incidentLocationLatitude && actualOrder.incidentLocationLongitude && (
          <Polyline
            coordinates={[
              { latitude: actualOrder.initialLocationDriverLatitude, longitude: actualOrder.initialLocationDriverLongitude },
              { latitude: actualOrder.incidentLocationLatitude, longitude: actualOrder.incidentLocationLongitude },
            ]}
            strokeColor="#000"
            strokeWidth={3}
          />
        )}
      </MapView>
      <View style={styles.details}>
        <Text style={styles.detailText}><Text style={styles.boldText}>Service Order ID:</Text> {order.serviceOrderId}</Text>
        <Text style={styles.detailText}><Text style={styles.boldText}>Status:</Text> {order.statusServiceOrder}</Text>
        <Text style={styles.detailText}><Text style={styles.boldText}>Description:</Text> {order.incidentDescription}</Text>
        <Text style={styles.detailText}><Text style={styles.boldText}>Customer Vehicle:</Text> {order.customerVehicleDescription}</Text>
        <Text style={styles.detailText}><Text style={styles.boldText}>Cost:</Text> ${order.incidentCost}</Text>
        <Text style={styles.detailText}><Text style={styles.boldText}>Policy ID:</Text> {order.policyId}</Text>
        <Text style={styles.detailText}><Text style={styles.boldText}>Date:</Text> {order.incidentDate}</Text>
        <Text style={styles.detailText}><Text style={styles.boldText}>Vehicle ID:</Text> {order.vehicleId}</Text>
        <Text style={styles.detailText}><Text style={styles.boldText}>Driver ID:</Text> {order.driverId}</Text>
        <Text style={styles.detailText}><Text style={styles.boldText}>Customer ID:</Text> {order.customerId}</Text>
        <Text style={styles.detailText}><Text style={styles.boldText}>Operator ID:</Text> {order.operatorId}</Text>
        <Text style={styles.detailText}><Text style={styles.boldText}>Service Fee ID:</Text> {order.serviceFeeId}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 2, // Ajusta la altura según sea necesario
  },
  details: {
    padding: 16,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 8,
  },
  boldText: {
    fontWeight: 'bold',
  },
});

export default MapComponent;