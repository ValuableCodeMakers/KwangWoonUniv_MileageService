import React, { Component, useEffect, useState } from 'react';
import {
    Icon,
    Container,
    Content,
    Header,
    Left,
    Body,
    Right,
    Button,
    Thumbnail,
    Card,
    CardItem,

} from 'native-base';

import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

var { width, height } = Dimensions.get('window');

var state = {
    profile_Load_Flag: false,
};

function profile_Load_EventHandler(flag) {
    state.profile_Load_Flag = flag
};

function profile_ThumbNail(flag) {
    switch (flag) {
        case false: {
            return (
                <View>
                    <Thumbnail
                        style={{
                            width: 140,
                            height: 140,
                            borderRadius: 70,
                            borderWidth: 5,
                            borderColor: 'pink',
                            backgroundColor: 'snow'

                        }} />
                    <Icon
                        name="camera"
                        type="Ionicons"
                        style={{
                            position: 'absolute',
                            paddingRight: 10,
                            fontSize: 70,
                            color: '#ff5050',
                            left: 35,
                            top: 30
                        }
                        }
                    />
                    <Icon
                        name="ios-add-circle"
                        type="Ionicons"
                        style={{
                            position: 'absolute',
                            paddingRight: 10,
                            fontSize: 30,
                            color: '#ff5050',
                            left: 100,
                            top: 100
                        }}
                    />
                </View>

            );
        }
        case true: {
            return (
                <Thumbnail
                    style={{
                        width: 140,
                        height: 140,
                        borderRadius: 70,
                        borderWidth: 5,
                        borderColor: 'pink',
                        backgroundColor: 'black'
                    }}
                />
            );
        }
    }
};

const ProfileScreen = (props) => {
    const reduxState = useSelector((state) => state); // redux의 store 가져오기
    const dispatch = useDispatch();

    // 유저 정보
    const userInfoState = reduxState.userInfo

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Header style={{ backgroundColor: '#ff5050' }}>
                <Left style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Icon
                        name="chevron-back"
                        type="Ionicons"
                        style={{ paddingRight: 10, fontSize: 25, color: 'white' }}
                        onPress={() => alert('back')}
                    />
                    <Text style={{ fontWeight: 'bold', fontSize: 17, color: 'white', alignItems: 'center' }}>내 프로필</Text>
                </Left>

                <Right style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Icon
                        name="settings-outline"
                        style={{ color: 'white' }}
                        onPress={() => profile_Load_EventHandler(!state.profile_Load_Flag)}
                    />
                </Right>
            </Header>
            <Content>
                <View style={{ paddingTop: 30, paddingBottom: 40, backgroundColor: 'snow' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 1.2, alignItems: 'center' }}>
                            {profile_ThumbNail(state.profile_Load_Flag)}
                        </View>

                    </View>
                </View>
                {/* 프로필 하단부 */}
                <View style={{ backgroundColor: 'black', paddingLeft: 13, paddingTop: 13, paddingBottom: 13 }}>
                    <Text style={{
                        color: '#bdc3c7',
                        fontSize: 13
                    }}>계정 설정</Text>
                </View>
                <View style={styles.bottomTab}>
                    <View>
                        <Text style={styles.bottomText1}>
                            성명
                            </Text>
                        <Text style={styles.bottomText2}>
                            {userInfoState.userId}
                        </Text>
                    </View>
                    <Right>
                        <Icon
                            name="chevron-forward"
                            type="Ionicons"
                            style={{ paddingRight: 10, fontSize: 25, color: 'white' }}
                        />
                    </Right>
                </View>

                <View style={styles.bottomTab}>
                    <View>
                        <Text style={styles.bottomText1}>
                            비밀번호
                            </Text>
                        <Text style={styles.bottomText2}>
                            dk
                            </Text>
                    </View>
                    <Right>
                        <Icon
                            name="chevron-forward"
                            type="Ionicons"
                            style={{ paddingRight: 10, fontSize: 25, color: 'white' }}
                        />
                    </Right>
                </View>
                <View style={styles.bottomTab}>
                    <View>
                        <Text style={styles.bottomText1}>
                            닉네임
                            </Text>
                        <Text style={styles.bottomText2}>
                            dk
                            </Text>
                    </View>
                    <Right>
                        <Icon
                            name="chevron-forward"
                            type="Ionicons"
                            style={{ paddingRight: 10, fontSize: 25, color: 'white' }}
                        />
                    </Right>
                </View>
                <View style={styles.bottomTab}>
                    <View>
                        <Text style={styles.bottomText1}>
                            지갑정보
                            </Text>
                        <Text style={styles.bottomText2}>
                            {userInfoState.userWalletAddress}
                        </Text>
                    </View>
                    <Right>
                        <Icon
                            name="chevron-forward"
                            type="Ionicons"
                            style={{ paddingRight: 10, fontSize: 25, color: 'white' }}
                        />
                    </Right>
                </View>

                <View style={styles.bottomTab}>
                    <View>
                        <Text style={styles.bottomText1}>
                            학과
                            </Text>
                        <Text style={styles.bottomText2}>
                            dk
                            </Text>
                    </View>
                    <Right>
                        <Icon
                            name="chevron-forward"
                            type="Ionicons"
                            style={{ paddingRight: 10, fontSize: 25, color: 'white' }}
                        />
                    </Right>
                </View>
            </Content>
        </View >
    );
};

ProfileScreen.navigationOptions = () => ({
    headerShown: false,
    tabBarIcon: ({ tintColor }) => (
        <Icon name="chevron-back"
            type="Ionicons" style={{ color: tintColor }} />
    ),
})

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    profilePhoto: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginLeft: 20,
    },
    profileButton: {
        flex: 1,
        justifyContent: 'center',
        height: 30,
        marginHorizontal: 10,
        marginTop: 10,
    },
    bottomTab: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: '#464646',
        paddingLeft: 13,
        paddingTop: 13,
        paddingBottom: 13
    },
    bottomText1: {
        fontSize: 15,
        color: '#bdc3c7',
        paddingBottom: 5,
    },
    bottomText2: {
        fontSize: 14,
        color: '#a0a0a0'
    },
});
