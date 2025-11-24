import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function MusicalCard({ musical, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: musical.imagem }} style={styles.imagem} />
      <View style={styles.cardInfo}>
        {musical.subtitulo ? (
          <Text style={styles.subtituloCard}>{musical.subtitulo}</Text>
        ) : null}
        <Text style={styles.tituloCard}>{musical.titulo}</Text>
        <View style={styles.tagsContainer}>
          {musical.tags.map((tag, index) => (
            <View
              key={index}
              style={[
                styles.tag,
                tag === 'teatro' && styles.tagTeatro,
                tag === 'filmes' && styles.tagFilmes,
                tag === 'português' && styles.tagPortugues
              ]}
            >
              <Text style={styles.tagTexto}>{tag}</Text>
            </View>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#F5F0F2',
    borderRadius: 20,
    marginBottom: 15,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imagem: {
    width: 80,
    height: 80,
    borderRadius: 15,
    marginRight: 15,
    backgroundColor: '#E0E0E0',
  },
  cardInfo: {
    flex: 1,
  },
  subtituloCard: {
    fontSize: 11,
    color: '#666',
    fontStyle: 'italic',
    marginBottom: 2,
  },
  tituloCard: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
    marginBottom: 4,
  },
  tagPortugues: {
    backgroundColor: '#E8F5E9',
  },
  tagTeatro: {
    backgroundColor: '#F3E5F5',
  },
  tagFilmes: {
    backgroundColor: '#BBDEFB',
  },
  tagTexto: {
    fontSize: 11,
    color: '#333',
  },
});
