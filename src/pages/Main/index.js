import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

/* GestureHandler */
import { Animated } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

import Header from '~/components/Header';
import Tabs from '~/components/Tabs';
import Menu from '~/components/Menu';

import {
  Container,
  Conteudo,
  Card,
  CardHeader,
  CardContent,
  Title,
  Description,
  CardFooter,
  Annotation,
} from './styles';

export default function Main() {
  let offset = 0;

  const translateY = new Animated.Value(0);

  const animatedEvent = Animated.event(
    [
      {
        nativeEvent: {
          translationY: translateY,
        },
      },
    ],
    { useNativeDriver: true },
  );

  function onHandlerStateChanged(event) {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      let opened = false;

      const { translationY } = event.nativeEvent;
      offset += translationY;

      translateY.setOffset(offset);

      if (translationY >= 80) {
        opened = true;
      } else {
        translateY.setOffset(0);
        translateY.setValue(offset);
        offset = 0;
      }

      Animated.timing(translateY, {
        toValue: opened ? 330 : 0,
        duration: 200,
        useNativeDrive: true,
      }).start(() => {
        offset = opened ? 330 : 0;
        translateY.setOffset(offset);
        translateY.setValue(0);
      });
    }
  }

  return (
    <Container>
      <Header />

      <Conteudo>
        <Menu translateY={translateY} />

        <PanGestureHandler
          onGestureEvent={animatedEvent}
          onHandlerStateChenge={onHandlerStateChanged}
        >
          <Card style={{
            transform: [{
              translateY: translateY.interpolate({
                inputRange: [-250, 0, 330],
                outputRange: [-50, 0, 330],
                extrapolate: 'clamp',
              }),
            }],
          }}
          >
            <CardHeader>
              <Icon name="attach-money" size={28} color="#666" />
              <Icon name="visibility-off" size={28} color="#666" />
            </CardHeader>
            <CardContent>
              <Title>Saldo disponivel</Title>
              <Description>R$ 197.611,55</Description>
            </CardContent>
            <CardFooter>
              <Annotation>
                Tranferencia de R$ 100,00 recebida por Antonio Carlos Martins
                hoje as 19:00h.
              </Annotation>
            </CardFooter>
          </Card>
        </PanGestureHandler>

      </Conteudo>

      <Tabs translateY={translateY} />
    </Container>
  );
}
