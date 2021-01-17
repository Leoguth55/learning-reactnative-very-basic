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
        api.get('projects')
            .then((response) => {
                setProjects(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    function postProject() {
        api.post('projects', {
            title: '4',
            owner: 'leo',
        }).then((response) => {
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
            <StatusBar barStyle="dark-content" />
            <Button title="Learn More" onPress={postProject} />
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={projects}
                    keyExtractor={(project) => project.id}
                    renderItem={({ item: project }) => (
                        <Text
                            key={project.id}
                            style={styles.title}
                            onPress={() => deleteProject(project.id)}
                        >
                            {project.id}
                        </Text>
                    )}
                />
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#7000c1',
        flex: 1,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
    },
});
