import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { View, Text } from '../Themed';

export default function DrawerContent() {
    return (
        <SafeAreaView>
        <View>
            <Text>Drawer content</Text>
        </View>
        </SafeAreaView>
    );
}
