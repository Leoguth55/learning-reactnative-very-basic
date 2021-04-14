import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  FlatList,
  View,
  Text,
  StyleSheet,
  StatusBar,
  Button,
  TextInput,
} from 'react-native';
import api from '../services/api';

export default function Home() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api
      .get('projects')
      .then((response) => {
        setProjects(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function postProject() {
    api
      .post('projects', {
        title: 'project',
        owner: 'leo',
      })
      .then((response) => {
        setProjects([...projects, response.data]);
      });
  }

  function deleteProject(id) {
    api.delete(`projects/${id}`).catch((err) => {
      console.log(err);
    });
    setProjects(projects.filter((project) => project.id !== id));
  }

  return (
    <>
      <StatusBar barStyle='dark-content' />
      <Button title='Add Proj' onPress={postProject} />
      <SafeAreaView style={styles.container}>
        <FlatList
          data={projects}
          keyExtractor={(project) => project.id}
          renderItem={({ item: project }) => (
            <Text
              key={project.id}
              style={styles.title}
              onPress={() => deleteProject(project.id)}>
              Owner: {project.owner}
            </Text>
          )}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#00a5a7',
    flex: 1,
  },
  title: {
    backgroundColor: '#00a599',
    textAlign: 'center',
    fontSize: 32,
    fontWeight: 'bold',
  },
});
