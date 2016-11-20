import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from "rxjs/Rx";

@Injectable()
export class MathService {
  private headers: Headers;

  constructor(private http: Http) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
  }

  getTime() {
    return this.http.get('http://date.jsontest.com')
      .map((response: Response) => response.json());
  }


  sendData(user: any) {
    const body = JSON.stringify(user);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('https://flickering-inferno-6917.firebaseio.com/test.json', body, {
      headers: headers
    })
      .map((data: Response) => data.json())
      .catch(this.handleError);
  }

    testfoursquare() {
        var url = "https://api.foursquare.com/v2/venues/search?v=20130815&&";
        var query = "&query=sushi";
        var near = "&near=Vienna,AT";
        var client_id = '&client_id=DATGSLTPSJN2AUSVTGOK12NIGHPOTDD4Z1SEZ0XLPN0DOPBU';
        var client_secret = '&client_secret=1YQUJF4STX2FTU4HMDDA5IFZEJSNSJB35RBTGP3SKKR0M4RL';
        var requrl = url + query + near + client_id + client_secret;
        return this.http.get(requrl)
            .map(res => res.json())
            .catch(this.handleError);
    }

  public getfirebasedata(url:string) {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http
      .get(url, { headers: headers })
           .map(res => res.json())
            .catch(this.handleError);
  }

    getPhotoURL(id:number) {
        var photourl = 'https://api.foursquare.com/v2/venues/' + id + '/photos?&&';
        var client_id = 'client_id=DATGSLTPSJN2AUSVTGOK12NIGHPOTDD4Z1SEZ0XLPN0DOPBU';
        var client_secret = '&client_secret=1YQUJF4STX2FTU4HMDDA5IFZEJSNSJB35RBTGP3SKKR0M4RL';
        var limit = '&limit=1';
        var v = '&v=20130815';
        var requrl = photourl + client_id + client_secret + limit + v;
        console.log(requrl);
        return requrl;
    }
    
    getImageIDs(ids:number[]) {
        var obs: any[];
        obs = [];
        for (var i = 0; i < ids.length; i++) {
            obs.push(this.http.get(this.getPhotoURL(ids[i])).map((res: Response) => res.json()));
        }
        console.log('obs', obs);
        return Observable.forkJoin(obs);
    }

  private addtoFirebase(): Promise<Response> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    var hero = {test:12345};
    return this.http
      .post("https://flickering-inferno-6917.firebaseio.com/equation/test.json", JSON.stringify(hero), { headers: headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
