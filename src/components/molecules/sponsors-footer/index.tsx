/* eslint-disable react-hooks/exhaustive-deps */
import { useFocusEffect } from '@react-navigation/core';
import _ from 'lodash';
import React, { useCallback, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';

import { SponsorsProps } from '../../../models/app/sponsors/sponsors.model';
import { getSponsorsAction } from '../../../reducers/sponsors-reducer/sponsors.actions';
import { sponsorsSelector } from '../../../reducers/sponsors-reducer/sponsors.reducer';
import useTheme from '../../../theme/hooks/useTheme';
import { Colors } from '../../../theme/Variables';

const SponsorsFooter: React.FC = () => {
  const { Layout, Gutters } = useTheme();
  const { sponsors } = useSelector(sponsorsSelector);
  const dispatch = useDispatch();

  const randomSponsors = useMemo(() => {
    return _.shuffle(sponsors).slice(0, 3);
  }, [sponsors]);

  useFocusEffect(
    useCallback(() => {
      const interval = setInterval(() => {
        dispatch(getSponsorsAction());
      }, 5000);
      return () => {
        clearInterval(interval);
      };
    }, [dispatch]),
  );

  const renderDivider = () => <View style={[Gutters.smallVMargin, styles.divider]} />;

  const renderSponsor = (sponsor: SponsorsProps) => {
    return (
      <View style={[Layout.row, Gutters.regularLMargin, Layout.fill]}>
        <Text style={[Gutters.regularLMargin, Layout.alignSelfCenter]}>
          {_.get(sponsor, 'name', '')}
        </Text>
      </View>
    );
  };

  return (
    <View style={[Layout.rowBetween, styles.footer]}>
      {renderSponsor(randomSponsors[0])}
      {renderDivider()}
      {renderSponsor(randomSponsors[1])}
      {renderDivider()}
      {renderSponsor(randomSponsors[2])}
    </View>
  );
};

const styles = StyleSheet.create({
  divider: { borderWidth: 0.5, height: '70%' },
  footer: {
    backgroundColor: Colors.lightGray,
    bottom: 0,
    height: 80,
    position: 'absolute',
    width: '100%',
  },
});

export default SponsorsFooter;
