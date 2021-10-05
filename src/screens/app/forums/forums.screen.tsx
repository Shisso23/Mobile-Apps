import React, { useState, useCallback, createRef } from 'react';
import { View, StyleSheet, FlatList, RefreshControl, Keyboard } from 'react-native';
import { Text, Icon } from 'react-native-elements';
import { FAB } from 'react-native-paper';
import ActionSheet from 'react-native-actions-sheet';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import { Colors } from '../../../theme/Variables';
import { useTheme } from '../../../theme';
import { ScreenContainer } from '../../../components';
import CategoryActionSheet from '../../../components/molecules/category-action-sheet-content';
import SearchBar from '../../../components/atoms/search-bar';
import PostItem from '../../../components/molecules/post-item';
import { getPostAction, getPostsAction } from '../../../reducers/posts-reducer/posts.actions';
import { postsSelector } from '../../../reducers/posts-reducer/posts.reducer';
import { apiPostProps } from '../../../models';

const ForumsScreen: React.FC = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const { posts } = useSelector(postsSelector);
  const dispatch = useDispatch();
  const [actionSheetIsVisible, setActionSheetIsVisible] = useState(false);
  const actionSheetRef = createRef<any>();
  const [searchResult, setSearchResult] = useState([]);
  const { Layout, Gutters, Common, Fonts } = useTheme();

  useFocusEffect(
    useCallback(() => {
      dispatch(getPostsAction());
    }, [dispatch]),
  );

  const getPost = async (id: any) => {
    const post = await dispatch(getPostAction(id));
    if (post) {
      navigation.navigate('ViewPost', { post });
    }
  };

  const handleJoinForum = () => {};

  const handleFilterPress = () => {
    Keyboard.dismiss();
    setActionSheetIsVisible(true);
    actionSheetRef.current.setModalVisible(true);
  };

  const searchForums = (searchKeyWord: string) => {
    setSearchText(searchKeyWord);
    const results = posts.filter(
      (post: apiPostProps) =>
        post.title.includes(searchKeyWord) || post.summary.includes(searchKeyWord),
    );
    setSearchResult(results);
  };

  const clearSearch = () => {
    setSearchText('');
  };

  const onActionSheetClose = () => {
    setActionSheetIsVisible(false);
  };

  const renderForum = ({ item }: { item: apiPostProps }) => {
    return (
      <PostItem
        item={item}
        handleJoinForum={handleJoinForum}
        onSelect={(post: apiPostProps) => getPost(post.id)}
      />
    );
  };

  return (
    <>
      <Text style={[Gutters.regularMargin, Fonts.titleSmall, styles.title]}>Community</Text>
      <View style={[Layout.rowCenter, Gutters.largeHMargin]}>
        <SearchBar
          value={searchText}
          clearSearch={clearSearch}
          onChangeTex={searchForums}
          placeHolder="Search forums"
        />

        <Icon
          name={actionSheetIsVisible ? 'filter' : 'equalizer'}
          type={actionSheetIsVisible ? 'feather' : 'simple-line-icon'}
          onPress={handleFilterPress}
          iconStyle={styles.iconsOpacity}
          containerStyle={[
            Common.inputWithRoundBorders,
            Gutters.smallPadding,
            styles.filterIconContainer,
            actionSheetIsVisible && { transform: [] },
          ]}
        />
      </View>
      <ScreenContainer contentContainerStyle={Gutters.smallPadding}>
        <FlatList
          contentContainerStyle={[Gutters.smallHMargin]}
          data={searchText.length > 0 ? searchResult : posts}
          renderItem={renderForum}
          keyExtractor={(item) => String(item.id)}
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={() => {}}
              tintColor={Colors.primary}
              colors={[Colors.primary]}
            />
          }
        />
      </ScreenContainer>
      <FAB
        style={[Common.fabAlignment, styles.fab]}
        icon="plus"
        color={Colors.white}
        onPress={() => navigation.navigate('CreatePost')}
      />
      <ActionSheet
        ref={actionSheetRef}
        gestureEnabled
        containerStyle={styles.actionSheet}
        onClose={onActionSheetClose}
      >
        <CategoryActionSheet showResults={() => {}} />
      </ActionSheet>
    </>
  );
};

const styles = StyleSheet.create({
  actionSheet: { borderRadius: 25 },
  fab: { backgroundColor: Colors.secondary, borderRadius: 10 },
  filterIconContainer: {
    borderColor: Colors.secondary,
    borderWidth: 1.5,
    bottom: '2%',
    right: '25%',
    transform: [{ rotate: '90deg' }],
  },
  iconsOpacity: { opacity: 0.72 },
  title: { fontWeight: '500', marginLeft: '5%' },
});

export default ForumsScreen;
