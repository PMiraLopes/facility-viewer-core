using System.Collections;
using UnityEngine;
using UnityEngine.Experimental.Networking;

public class NetworkCenas : MonoBehaviour
{
    void Start()
    {
    }

    public void getData(){
      StartCoroutine(GetText());
    }

    IEnumerator GetText()
    {
        using (UnityWebRequest request = UnityWebRequest.Get("http://localhost:3000/measures"))
        {
            yield return request.Send();

            if (request.isError) // Error
            {
                print(request.error);
            }
            else // Success
            {
                print(request.downloadHandler.text);
            }
        }
    }
}
