import { View, Text, Modal, ActivityIndicator } from 'react-native'
import React from 'react'

interface Props {
    visible: boolean,
    mess?: string,

}

const LoadingModal = (props:Props) => {

    const { visible, mess } = props

    return (
        <Modal style={[ { flex: 1 ,backgroundColor:'#ffffff'}]} transparent statusBarTranslucent visible={visible}>
            <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator color={'white'} />
                <Text style={{flex:0}}>loading</Text>
            </View>
        </Modal>
    )
}

export default LoadingModal