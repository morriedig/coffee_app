import { createStackNavigator } from 'react-navigation';

import Loading from '../screen/loading';
import Home from '../screen/home';
import CoffeeShow from '../screen/coffee_show';
import UserPosition from '../screen/user_position';

export default Route = createStackNavigator(
  {
    Loading: Loading,
    Home: Home,
    CoffeeShow: CoffeeShow,
    UserPosition: UserPosition,
  },{
    initialRouteName: "Loading", 
  }
)