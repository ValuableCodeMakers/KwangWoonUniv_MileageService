import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Icon,
} from 'react-native';
import { Card } from 'native-base';
import { Address } from '../../modules/Url.js';
import { width, height } from '../../modules/Dimensions.js'

const userInfo = {
    Id: '',
    Name: '',
    Nickname: '',
    Department: '',
}

function confirmButtonClickEvent(state, navigation) {
    if (state.name == '')
        state.name = userInfo.Name;
    if (state.nickname == '')
        state.nickname = userInfo.Nickname;
    if (state.department == '')
        state.department = userInfo.Department;
    fetch(Address.url + '/routes/changeProfile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            Id: userInfo.Id,
            name: state.name,
            nickname: state.nickname,
            department: state.department,
        }),
    }).then((res) => {
        console.log(res);
    });


    navigation.goBack();
}

export default class ChangeProfileScreen extends Component {
    static navigationOptions = {
        headerShown: false,
        tabBarIcon: ({ tintColor }) => (
            <Icon name="chevron-back" type="Ionicons" style={{ color: tintColor }} />
        ),
    };

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            nickname: '',
            department: '',
        };
    }


    render() {
        userInfo.Id = this.props.navigation.state.params.Id;
        userInfo.Name = this.props.navigation.state.params.Name;
        userInfo.Nickname = this.props.navigation.state.params.Nickname;
        userInfo.Department = this.props.navigation.state.params.Department;

        return (
            <View style={styles.container}>
                <View style={styles.background}></View>
                <View style={styles.inputContainer}>
                    <Text style={styles.title}>프로필 수정</Text>
                    <Card style={styles.card}>
                        <View style={{ marginTop: 30 }}>
                            <Text style={styles.inputTitle}>이름</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="미입력 시 기존 이름"
                                autoCapitalize="none"
                                onChangeText={(name) => this.setState({ name })}
                                value={this.state.name}></TextInput>
                        </View>

                        <View style={{ marginTop: 30 }}>
                            <Text style={styles.inputTitle}>별명</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="미입력 시 기존 별명"
                                autoCapitalize="none"
                                onChangeText={(nickname) => this.setState({ nickname })}
                                value={this.state.nickname}></TextInput>
                        </View>
                        <View style={{ marginTop: 30 }}>
                            <Text style={styles.inputTitle}>학과</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="미입력 시 기존 학과"
                                autoCapitalize="none"
                                onChangeText={(department) => this.setState({ department })}
                                value={this.state.department}></TextInput>
                        </View>
                    </Card>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() =>
                            confirmButtonClickEvent(this.state, this.props.navigation)
                        }>
                        <Text style={{ fontSize: 20 }}>수정</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        //justifyContent: 'center',
        position: 'relative',
    },
    card: {
        alignItems: 'center',
        height: height * 0.45,
    },
    inputContainer: {
        marginTop: height * 0.1,
        width: width / 1.1,
        position: 'absolute',
    },
    title: {
        marginLeft: 10,
        color: 'white',
        fontSize: 30,
        textTransform: 'uppercase',
    },
    inputTitle: {
        color: '#7f8c8d',
        fontSize: 15,
        textTransform: 'uppercase',
    },
    input: {
        borderColor: '#7f8c8d',
        backgroundColor: '#ecf0f1',
        fontSize: 15,
        height: 40,
        width: width / 1.2,
    },
    button: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2ecc71',
        borderRadius: 10,
        height: 50,
        elevation: 20,
    },
    background: {
        marginTop: 0,
        height: height * 0.4,
        width: width,
        backgroundColor: '#c0392b',
        //position: "absolute"
    },
});
