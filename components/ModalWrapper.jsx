// components/ModalWrapper.js
import React from "react";
import { Modal, ImageBackground, View, StyleSheet } from "react-native";

/**
 * ModalWrapper
 * A small wrapper around React Native's Modal that applies the project's
 * blur background image + a dim overlay and positions children at the bottom
 * (like a bottom sheet). Pass `blurSource` prop (required in this project)
 */
export default function ModalWrapper({ visible, onRequestClose, children, blurSource, overlayOpacity = 0.3 }) {
  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onRequestClose}>
      <ImageBackground source={blurSource} style={StyleSheet.absoluteFill} resizeMode="cover">
        <View style={[styles.dimOverlay, { backgroundColor: `rgba(0,0,0,${overlayOpacity})` }]} />
        <View style={styles.modalOverlay}>{children}</View>
      </ImageBackground>
    </Modal>
  );
}

const styles = StyleSheet.create({
  dimOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
});
