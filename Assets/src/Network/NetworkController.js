#pragma strict

import UnityEngine;
import UnityEngine.UI;
import UnityEngine.Networking;

public class NetworkController {

  var url = "http://127.0.0.1:3000/measures";

  public function NetworkController(){

  }

  public function getData(){
    print('entrei');
    var www : WWW = new WWW (url);
    yield www;

    if(www.error) {
      print("There was an error: " + www.error);
    }else{
      print(www.text);
    }
  }
}
