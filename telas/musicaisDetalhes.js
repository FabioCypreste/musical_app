import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity, Linking } from 'react-native';

export default function DetailScreen({ musical, onBack }) {
  const abrirVideo = () => {
    const url = `https://www.youtube.com/watch?v=${musical.videoId}`;
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.voltarButton} onPress={onBack}>
        <Text style={styles.voltarTexto}>← Voltar</Text>
      </TouchableOpacity>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <Image source={{ uri: musical.imagem }} style={styles.imagemGrande} />
        
        {musical.subtitulo ? (
          <Text style={styles.subtitulo}>{musical.subtitulo}</Text>
        ) : null}
        
        <Text style={styles.titulo}>{musical.titulo}</Text>

        {/* Info Cards */}
        <View style={styles.infoCardsContainer}>
          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>🎭 Gênero</Text>
            <Text style={styles.infoValor}>{musical.genero}</Text>
          </View>
          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>📍 Cidade</Text>
            <Text style={styles.infoValor}>{musical.cidade}</Text>
          </View>
          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>🗣️ Idioma</Text>
            <Text style={styles.infoValor}>{musical.idioma}</Text>
          </View>
        </View>

        <View style={styles.tagsContainer}>
          {musical.tags.map((tag, index) => (
            <View
              key={index}
              style={[
                styles.tag,
                tag === 'teatro' && styles.tagTeatro,
                tag === 'filmes' && styles.tagFilmes,
                tag === 'português' && styles.tagPortugues,
                tag === 'inglês' && styles.tagIngles,
                tag === 'brasileiro' && styles.tagBrasileiro,
                tag === 'internacional' && styles.tagInternacional
              ]}
            >
              <Text style={styles.tagTexto}>{tag}</Text>
            </View>
          ))}
        </View>

        <View style={styles.descricaoContainer}>
          <Text style={styles.descricaoTitulo}>Sobre o Musical</Text>
          <Text style={styles.descricao}>{musical.descricao}</Text>
        </View>

        <TouchableOpacity style={styles.videoButton} onPress={abrirVideo}>
          <Text style={styles.videoButtonTexto}>▶️ Assistir Apresentação ao Vivo</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5F7',
  },
  voltarButton: {
    padding: 20,
    paddingTop: 50,
  },
  voltarTexto: {
    fontSize: 16,
    color: '#8B2635',
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  imagemGrande: {
    width: '100%',
    height: 300,
    borderRadius: 20,
    marginBottom: 15,
    backgroundColor: '#E0E0E0',
  },
  subtitulo: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    marginBottom: 5,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#8B2635',
    marginBottom: 20,
  },
  infoCardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 10,
  },
  infoCard: {
    flex: 1,
    backgroundColor: '#F5F0F2',
    padding: 12,
    borderRadius: 15,
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 11,
    color: '#666',
    marginBottom: 4,
  },
  infoValor: {
    fontSize: 12,
    color: '#333',
    fontWeight: '600',
    textAlign: 'center',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 25,
    gap: 8,
  },
  tag: {
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 15,
    marginRight: 8,
    marginBottom: 8,
  },
  tagPortugues: {
    backgroundColor: '#E8F5E9',
  },
  tagIngles: {
    backgroundColor: '#E3F2FD',
  },
  tagTeatro: {
    backgroundColor: '#F3E5F5',
  },
  tagFilmes: {
    backgroundColor: '#BBDEFB',
  },
  tagBrasileiro: {
    backgroundColor: '#FFF9C4',
  },
  tagInternacional: {
    backgroundColor: '#FFE0B2',
  },
  tagTexto: {
    fontSize: 12,
    color: '#333',
    fontWeight: '500',
  },
  descricaoContainer: {
    marginBottom: 25,
  },
  descricaoTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  descricao: {
    fontSize: 15,
    color: '#555',
    lineHeight: 24,
    textAlign: 'justify',
  },
  videoButton: {
    backgroundColor: '#8B2635',
    padding: 18,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  videoButtonTexto: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
