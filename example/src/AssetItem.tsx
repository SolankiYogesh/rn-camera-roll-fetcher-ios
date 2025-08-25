import type { PhotoIdentifier } from '@react-native-camera-roll/camera-roll';
import { memo, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getFileUri } from 'react-native-rn-camera-roll-fetcher-ios';

interface Props {
  asset: PhotoIdentifier;
}
export default memo(({ asset }: Props) => {
  const [revealed, setRevealed] = useState<string | null>(null);
  return (
    <View style={styles.card}>
      <Image source={{ uri: asset?.node?.image?.uri }} style={styles.image} />

      <View style={styles.rightSection}>
        <Text style={styles.uri} numberOfLines={1}>
          {revealed ? revealed : asset?.node?.image?.uri}
        </Text>

        {!revealed && (
          <TouchableOpacity
            style={styles.button}
            onPress={async () => {
              const uri = await getFileUri(asset.node.image.uri);
              setRevealed(uri);
            }}
          >
            <Text style={styles.buttonText}>Reveal</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
});
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
