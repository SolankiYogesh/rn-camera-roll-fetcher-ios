import { useCameraRoll } from '@react-native-camera-roll/camera-roll';
import { useEffect } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import AssetItem from './AssetItem';

export default function App() {
  const [photos, getPhotos] = useCameraRoll();

  useEffect(() => {
    getPhotos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Camera Roll Assets</Text>
      <FlatList
        data={photos?.edges ?? []}
        renderItem={({ item }) => <AssetItem asset={item} />}
        keyExtractor={(item) => item?.node?.id}
        contentContainerStyle={styles.contentContainerStyle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingBottom: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    paddingTop: 50,
    paddingHorizontal: 12,
  },
  header: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
    color: '#2C3E50',
    textAlign: 'center',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    alignItems: 'center',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 12,
    marginRight: 12,
  },
  rightSection: {
    flex: 1,
    justifyContent: 'space-between',
  },
  uri: {
    fontSize: 14,
    color: '#34495E',
    marginBottom: 8,
  },
  button: {
    alignSelf: 'flex-start',
    backgroundColor: '#4CAF50',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
