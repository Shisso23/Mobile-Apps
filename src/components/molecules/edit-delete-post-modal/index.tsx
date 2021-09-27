import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, Platform } from 'react-native';
import { Menu } from 'react-native-paper';
import { Icon, ListItem } from 'react-native-elements';

import { Colors } from '../../../theme/Variables';
import { useTheme } from '../../../theme';

type EditDeletePostProps = {
  handleEdit: Function;
  handleDelete: Function;
};

const EditDeletePost: React.FC<EditDeletePostProps> = ({ handleEdit, handleDelete }) => {
  const [postOptionsModalVisible, setPostOptionsModalVisible] = useState(false);
  const { Gutters, Layout } = useTheme();

  const hidePostOptionsModal = () => {
    setPostOptionsModalVisible(false);
  };

  return (
    <>
      <Menu
        style={[Layout.alignSelfCenter, styles.menu]}
        visible={postOptionsModalVisible}
        onDismiss={hidePostOptionsModal}
        anchor={
          <Icon
            name="dots-vertical"
            type="material-community"
            onPress={() => setPostOptionsModalVisible(true)}
          />
        }
        contentStyle={styles.postMenuContent}
      >
        <ListItem>
          <ListItem.Content>
            <ListItem.Title style={styles.postMenuTitle}>Reason</ListItem.Title>
          </ListItem.Content>
          <Icon name="md-close-circle-outline" type="ionicon" onPress={hidePostOptionsModal} />
        </ListItem>
        <TouchableOpacity style={Gutters.regularMargin} onPress={handleEdit}>
          <Text>Edit Post</Text>
        </TouchableOpacity>
        <TouchableOpacity style={Gutters.regularMargin} onPress={handleDelete}>
          <Text>Delete Post</Text>
        </TouchableOpacity>
      </Menu>
    </>
  );
};

const styles = StyleSheet.create({
  menu: {
    ...Platform.select({
      android: { elevation: 3, backgroundColor: Colors.transparent },
      ios: {},
    }),
    borderRadius: 15,
    height: 300,
    marginBottom: 100,
    overflow: 'scroll',
    shadowColor: Colors.shadow,
    shadowOffset: {
      height: 16,
      width: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    top: '35%',
    width: '80%',
  },
  postMenuContent: { borderRadius: 15, height: '100%', width: '100%' },
  postMenuTitle: { fontWeight: '500' },
});
export default EditDeletePost;
