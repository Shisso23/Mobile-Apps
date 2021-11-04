import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { Icon } from 'react-native-elements';

import useTheme from '../../../theme/hooks/useTheme';
import { Colors } from '../../../theme/Variables';
import CustomHeaderButton from '../custom-header-button';

type BackButtonProps = {
  onBack: any;
  color?: any;
  style?: any;
  backButton?: Boolean;
  engagementScoreVisible?: Boolean;
  notificationBellVisible?: Boolean;
};

const Header: React.FC<BackButtonProps> = (props) => {
  const { Gutters, Common, Layout } = useTheme();
  const navigation = useNavigation<DrawerNavigationProp<any>>();
  const handleOnPress = () => {
    return navigation.toggleDrawer();
  };

  return (
    <View style={[Layout.rowBetween, Layout.alignItemsEnd, styles.header]}>
      <CustomHeaderButton
        {...props}
        onPress={handleOnPress}
        image={require('../../../assets/icons/menu/menu.png')}
        backButton={props.backButton}
      />

      <View style={[Layout.rowBetween, Gutters.tinyVPadding, Gutters.regularRMargin]}>
        {props.notificationBellVisible !== false && (
          <Icon
            type="font-awesome-5"
            name="bell"
            size={20}
            onPress={() => navigation.navigate('Notifications')}
            containerStyle={[Gutters.smallRMargin, Gutters.tinyTMargin, styles.iconsOpacity]}
          />
        )}

        {props.engagementScoreVisible !== false && ( //TODO use engagaement score endpoint when available
          <View style={[Layout.rowBetween, styles.engagementScore, Gutters.tinyPadding]}>
            <Icon
              name="user"
              type="feather"
              size={15}
              containerStyle={[
                styles.iconsOpacity,
                Common.android60PercentWhite,
                Gutters.tinyRMargin,
              ]}
            />
            <Text>000</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  engagementScore: { borderColor: Colors.secondary, borderRadius: 10, borderWidth: 1 },
  header: { backgroundColor: Colors.transparent, height: 90 },
  iconsOpacity: { opacity: 0.72 },
});
