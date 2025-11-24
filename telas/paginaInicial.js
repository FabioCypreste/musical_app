import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import MusicalCard from '../components/musicaisCard';
import { musicais, getGeneros, getCidades, getIdiomas } from '../data/musicaisData';

export default function HomeScreen({ onSelectMusical }) {
  const [busca, setBusca] = useState('');
  const [generoSelecionado, setGeneroSelecionado] = useState('Todos');
  const [cidadeSelecionada, setCidadeSelecionada] = useState('Todas');
  const [idiomaSelecionado, setIdiomaSelecionado] = useState('Todos');
  const [modalVisivel, setModalVisivel] = useState(false);

  const generos = getGeneros();
  const cidades = getCidades();
  const idiomas = getIdiomas();

  const musicaisFiltrados = musicais.filter(musical => {
    const matchBusca = musical.titulo.toLowerCase().includes(busca.toLowerCase()) ||
                       musical.genero.toLowerCase().includes(busca.toLowerCase()) ||
                       musical.cidade.toLowerCase().includes(busca.toLowerCase());
    
    const matchGenero = generoSelecionado === 'Todos' || musical.genero === generoSelecionado;
    const matchCidade = cidadeSelecionada === 'Todas' || musical.cidade === cidadeSelecionada;
    const matchIdioma = idiomaSelecionado === 'Todos' || musical.idioma === idiomaSelecionado;
    
    return matchBusca && matchGenero && matchCidade && matchIdioma;
  });

  const limparFiltros = () => {
    setGeneroSelecionado('Todos');
    setCidadeSelecionada('Todas');
    setIdiomaSelecionado('Todos');
    setModalVisivel(false);
  };

  const filtrosAtivos = [generoSelecionado, cidadeSelecionada, idiomaSelecionado]
    .filter(f => f !== 'Todos' && f !== 'Todas').length;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>Clap!</Text>
        <Text style={styles.subtitulo}>Onde a mágica dos musicais nunca vai de cortina.</Text>
      </View>

      <View style={styles.buscaFiltroContainer}>
        <TextInput
          style={styles.inputBusca}
          placeholder="🔍 Pesquisar musicais..."
          placeholderTextColor="#999"
          value={busca}
          onChangeText={setBusca}
        />
        
        <TouchableOpacity 
          style={styles.filtroButton}
          onPress={() => setModalVisivel(true)}
        >
          <Text style={styles.filtroButtonTexto}>
            🎭 {filtrosAtivos > 0 ? `(${filtrosAtivos})` : ''}
          </Text>
        </TouchableOpacity>
      </View>

      {filtrosAtivos > 0 && (
        <View style={styles.filtrosAtivosContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {generoSelecionado !== 'Todos' && (
              <View style={styles.chipFiltro}>
                <Text style={styles.chipTexto}>{generoSelecionado}</Text>
                <TouchableOpacity onPress={() => setGeneroSelecionado('Todos')}>
                  <Text style={styles.chipRemover}> ✕</Text>
                </TouchableOpacity>
              </View>
            )}
            {cidadeSelecionada !== 'Todas' && (
              <View style={styles.chipFiltro}>
                <Text style={styles.chipTexto}>{cidadeSelecionada}</Text>
                <TouchableOpacity onPress={() => setCidadeSelecionada('Todas')}>
                  <Text style={styles.chipRemover}> ✕</Text>
                </TouchableOpacity>
              </View>
            )}
            {idiomaSelecionado !== 'Todos' && (
              <View style={styles.chipFiltro}>
                <Text style={styles.chipTexto}>{idiomaSelecionado}</Text>
                <TouchableOpacity onPress={() => setIdiomaSelecionado('Todos')}>
                  <Text style={styles.chipRemover}> ✕</Text>
                </TouchableOpacity>
              </View>
            )}
          </ScrollView>
        </View>
      )}

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.grid}>
        <Text style={styles.resultadosTexto}>
          {musicaisFiltrados.length} {musicaisFiltrados.length === 1 ? 'musical encontrado' : 'musicais encontrados'}
        </Text>

        {musicaisFiltrados.length > 0 ? (
          musicaisFiltrados.map((musical) => (
            <MusicalCard
              key={musical.id}
              musical={musical}
              onPress={() => onSelectMusical(musical)}
            />
          ))
        ) : (
          <View style={styles.vazioContainer}>
            <Text style={styles.vazioTexto}>Nenhum musical encontrado 🎭</Text>
            <Text style={styles.vazioSubtexto}>Tente ajustar os filtros</Text>
          </View>
        )}
      </ScrollView>

      {/* Modal de Filtros */}
      <Modal
        visible={modalVisivel}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisivel(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitulo}>Filtros</Text>
              <TouchableOpacity onPress={() => setModalVisivel(false)}>
                <Text style={styles.modalFechar}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalContent}>
              {/* Filtro de Gênero */}
              <Text style={styles.filtroTitulo}>Gênero</Text>
              <View style={styles.opcoesFiltro}>
                {generos.map((genero) => (
                  <TouchableOpacity
                    key={genero}
                    style={[
                      styles.opcaoButton,
                      generoSelecionado === genero && styles.opcaoButtonAtivo
                    ]}
                    onPress={() => setGeneroSelecionado(genero)}
                  >
                    <Text style={[
                      styles.opcaoTexto,
                      generoSelecionado === genero && styles.opcaoTextoAtivo
                    ]}>
                      {genero}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Filtro de Cidade */}
              <Text style={styles.filtroTitulo}>Cidade</Text>
              <View style={styles.opcoesFiltro}>
                {cidades.map((cidade) => (
                  <TouchableOpacity
                    key={cidade}
                    style={[
                      styles.opcaoButton,
                      cidadeSelecionada === cidade && styles.opcaoButtonAtivo
                    ]}
                    onPress={() => setCidadeSelecionada(cidade)}
                  >
                    <Text style={[
                      styles.opcaoTexto,
                      cidadeSelecionada === cidade && styles.opcaoTextoAtivo
                    ]}>
                      {cidade}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Filtro de Idioma */}
              <Text style={styles.filtroTitulo}>Idioma</Text>
              <View style={styles.opcoesFiltro}>
                {idiomas.map((idioma) => (
                  <TouchableOpacity
                    key={idioma}
                    style={[
                      styles.opcaoButton,
                      idiomaSelecionado === idioma && styles.opcaoButtonAtivo
                    ]}
                    onPress={() => setIdiomaSelecionado(idioma)}
                  >
                    <Text style={[
                      styles.opcaoTexto,
                      idiomaSelecionado === idioma && styles.opcaoTextoAtivo
                    ]}>
                      {idioma}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>

            <View style={styles.modalFooter}>
              <TouchableOpacity style={styles.limparButton} onPress={limparFiltros}>
                <Text style={styles.limparTexto}>Limpar Filtros</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.aplicarButton} 
                onPress={() => setModalVisivel(false)}
              >
                <Text style={styles.aplicarTexto}>Aplicar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5F7',
  },
  header: {
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  titulo: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#8B2635',
    fontStyle: 'italic',
  },
  subtitulo: {
    fontSize: 12,
    color: '#333',
    marginTop: 5,
    textAlign: 'center',
  },
  buscaFiltroContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 15,
    gap: 10,
  },
  inputBusca: {
    flex: 1,
    backgroundColor: '#F0E5E8',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    fontSize: 14,
    color: '#333',
  },
  filtroButton: {
    backgroundColor: '#8B2635',
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filtroButtonTexto: {
    fontSize: 20,
  },
  filtrosAtivosContainer: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  chipFiltro: {
    flexDirection: 'row',
    backgroundColor: '#8B2635',
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    alignItems: 'center',
  },
  chipTexto: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '500',
  },
  chipRemover: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  scrollView: {
    flex: 1,
  },
  grid: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  resultadosTexto: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
    paddingHorizontal: 5,
  },
  vazioContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  vazioTexto: {
    fontSize: 18,
    color: '#666',
    fontWeight: '600',
  },
  vazioSubtexto: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0E5E8',
  },
  modalTitulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8B2635',
  },
  modalFechar: {
    fontSize: 28,
    color: '#666',
  },
  modalContent: {
    padding: 20,
  },
  filtroTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 15,
    marginBottom: 10,
  },
  opcoesFiltro: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 10,
  },
  opcaoButton: {
    backgroundColor: '#F0E5E8',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  opcaoButtonAtivo: {
    backgroundColor: '#8B2635',
  },
  opcaoTexto: {
    color: '#333',
    fontSize: 13,
    fontWeight: '500',
  },
  opcaoTextoAtivo: {
    color: '#FFF',
  },
  modalFooter: {
    flexDirection: 'row',
    padding: 20,
    gap: 10,
    borderTopWidth: 1,
    borderTopColor: '#F0E5E8',
  },
  limparButton: {
    flex: 1,
    backgroundColor: '#F0E5E8',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  limparTexto: {
    color: '#8B2635',
    fontSize: 15,
    fontWeight: 'bold',
  },
  aplicarButton: {
    flex: 1,
    backgroundColor: '#8B2635',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  aplicarTexto: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
