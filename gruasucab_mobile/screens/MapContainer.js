import React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps';

const MapComponent = ({ order }) => {


  const initialRegion = {
    latitude: order.incidentLocationLat || 10.49400,
    longitude: order.incidentLocationLon || -66.87400,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

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
      elementType: 'labels.text.stroke',
      stylers: [{ visibility: 'on' }, { color: '#000000' }],
    },
    {
      featureType: 'landscape',
      elementType: 'all',
      stylers: [{ visibility: 'on' }, { color: '#e5e5e5' }],
    },
  ];

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={initialRegion}
        provider={PROVIDER_GOOGLE}
        customMapStyle={mapStyle}
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
        {order.initialLocationDriverLat && order.initialLocationDriverLon && (
          <Marker
            coordinate={{ latitude: order.initialLocationDriverLat, longitude: order.initialLocationDriverLon }}
            title="Conductor"
            description="Posición inicial del conductor"
          />
        )}
        {order.incidentLocationLat && order.incidentLocationLon && (
          <Marker
            coordinate={{ latitude: order.incidentLocationLat, longitude: order.incidentLocationLon }}
            title="Incidente"
            description="Ubicación del incidente"
          />
        )}
        {order.incidentLocationEndLat && order.incidentLocationEndLon && (
          <Marker
            coordinate={{ latitude: order.incidentLocationEndLat, longitude: order.incidentLocationEndLon }}
            title="Destino"
            description="Destino del incidente"
          />
        )}
        {order.incidentLocationLat && order.incidentLocationLon && order.incidentLocationEndLat && order.incidentLocationEndLon && (
          <Polyline
            coordinates={[
              { latitude: order.incidentLocationLat, longitude: order.incidentLocationLon },
              { latitude: order.incidentLocationEndLat, longitude: order.incidentLocationEndLon },
            ]}
            strokeColor="#000"
            strokeWidth={3}
          />
        )}
        {order.initialLocationDriverLat && order.initialLocationDriverLon && order.incidentLocationLat && order.incidentLocationLon && (
          <Polyline
            coordinates={[
              { latitude: order.initialLocationDriverLat, longitude: order.initialLocationDriverLon },
              { latitude: order.incidentLocationLat, longitude: order.incidentLocationLon },
            ]}
            strokeColor="#FF0000"
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
    flex: 1,
    marginTop: 20,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 10,
  },
  boldText: {
    fontWeight: 'bold',
  },
});

export default MapComponent;