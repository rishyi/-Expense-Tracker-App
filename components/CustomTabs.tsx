import { View, Platform, TouchableOpacity, StyleSheet } from 'react-native';
import { useIsFocused, useLinkBuilder, useTheme } from '@react-navigation/native';
import { Text, PlatformPressable } from '@react-navigation/elements';
import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors, spacingY } from '@/constants/theme';
import { verticalScale } from '@/utils/styling';
import * as Icons from 'phosphor-react-native'

export default function CustomTabs({ state, descriptors, navigation } : BottomTabBarProps) {


    const tabbarIcons: any = {
        index: (useIsFocused: boolean) => (
            <Icons.House 
            size={verticalScale(30)}
            weight={useIsFocused ? "fill" : "regular"}
            color={useIsFocused ? colors.primary : colors.neutral350}
            />
        ),

        Statistics: (useIsFocused: boolean) => (
            <Icons.ChartBar 
            size={verticalScale(30)}
            weight={useIsFocused ? "fill" : "regular"}
            color={useIsFocused ? colors.primary : colors.neutral350}
            />
        ),

        wallet: (useIsFocused: boolean) => (
            <Icons.Wallet 
            size={verticalScale(30)}
            weight={useIsFocused ? "fill" : "regular"}
            color={useIsFocused ? colors.primary : colors.neutral350}
            />
        ),

        profile: (useIsFocused: boolean) => (
            <Icons.User 
            size={verticalScale(30)}
            weight={useIsFocused ? "fill" : "regular"}
            color={useIsFocused ? colors.primary : colors.neutral350}
            />
        ),
    }

  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label: any =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            // href={buildHref(route.name, route.params)}
            key={route.name}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabBarItem}
          >
           <Text style = {{color: isFocused ? colors.primary : colors.neutral350}}>
             {label}
           </Text>

           {
            tabbarIcons[route.name] && tabbarIcons[route.name](isFocused)
           }
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
    tabBar: {
        flexDirection: 'row',
        width: '100%', 
        height: Platform.OS === 'ios' ? verticalScale(73) : verticalScale(55),
        backgroundColor: colors.neutral800,
        justifyContent: 'space-around',
        alignItems: 'center',
        borderTopColor: colors.neutral600,
        borderTopWidth: 1,
    },
    tabBarItem: {
        marginBottom: Platform.OS === 'ios' ? spacingY._10 : spacingY._5,
        justifyContent: 'center',
        alignItems: 'center',
    },
});