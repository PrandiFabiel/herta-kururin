import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  Image,
  Linking,
} from "react-native";
import { AVPlaybackSource, Audio } from "expo-av";
import AsyncStorage from "@react-native-async-storage/async-storage";

const requires: AVPlaybackSource[] = [
  require("./assets/audio/kuruto.mp3"),
  require("./assets/audio/kuru1.mp3"),
  require("./assets/audio/kuru2.mp3"),
];

export default function App() {
  const [sound, setSound] = useState<Audio.Sound>();
  const [firstClick, setFirstClick] = useState<boolean>(true);
  const [audio, setAudio] = useState<AVPlaybackSource>(requires[0]);
  const [count, setCount] = useState<number>(0);

  const playRandomSound = async () => {
    setCount(count + 1);
    if (firstClick) {
      console.log("emtro");
      setFirstClick(false);
      const { sound } = await Audio.Sound.createAsync(audio);
      setSound(sound);
      await sound.playAsync();
    }
    const randomIndex = Math.floor(Math.random() * requires.length);
    setAudio(requires[randomIndex]);
    const { sound } = await Audio.Sound.createAsync(audio);
    setSound(sound);

    await AsyncStorage.setItem("count", count.toString());
    await sound.playAsync();
  };

  const openUrl = (url: string) => {
    Linking.openURL(url);
  };

  useEffect(() => {
    //AsyncStorage.removeItem("count");
    AsyncStorage.getItem("count").then((e) => {
      setCount(Number(e) + 1);
    });
  }, []);

  useEffect(() => {
    return sound
      ? () => {
          //console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.title}>Welcome to kuru kuru</Text>
      <View style={styles.viewButton}>
        <Text style={styles.textCount}>Kururus?</Text>
        <Text style={styles.textCount}>{count}</Text>
        <Text style={styles.textCount}>times</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={async () => await playRandomSound()}
        >
          <Text style={styles.textButton}>Kuru kuru!!</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.viewImage}>
        <Image
          resizeMode="stretch"
          style={styles.image}
          source={require("./assets/hertaimgs/card.jpg")}
        />
      </View>
      <View style={styles.viewCreditos}>
        <Text style={styles.textCreditos}>
          Herta gif made by{" "}
          <Text
            style={styles.textLink}
            onPress={() => openUrl("https://twitter.com/Seseren_kr")}
          >
            @Seseren_kr
          </Text>
        </Text>
        <Text style={styles.textCreditos}>
          This app is based on the{" "}
          <Text
            style={styles.textLink}
            onPress={() => openUrl("https://github.com/duiqt/herta_kuru")}
          >
            duiqt
          </Text>{" "}
          github repo.
        </Text>
        <Text style={styles.textCreditos}>
          You can check out the GitHub repository here:{" "}
        </Text>
        <Text
            style={styles.textLink}
            onPress={() => openUrl("https://github.com/PrandiFabiel/herta-kururin")}
          >
            Kuru kuru repo
          </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#9D88D3",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#574f84",
    height: 50,
    width: 120,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  textButton: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginTop: Platform.OS === "android" ? 35 : 0,
  },
  viewButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textCount: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  viewImage: {
    margin: 0,
    padding: 5,
    width: "100%",
    height: 235,
    alignItems: "center",
  },
  viewCreditos: {
    alignItems: "center",
  },
  textCreditos: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
  textLink: {
    color: "blue",
    fontSize: 15,
    fontWeight: "bold",
  },
});
