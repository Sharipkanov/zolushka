import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod, XHRBackend, RequestOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

export function BackendMock(backend: MockBackend, options: BaseRequestOptions, realBackend: XHRBackend) {

  backend.connections.subscribe((connection: MockConnection) => {
    setTimeout(() => {

      if (connection.request.url.indexOf('/locations') > - 1 && connection.request.method === RequestMethod.Get) {
        const parsedUrl = connection.request.url.replace('api.zolushka.ru/', '').split('/');
        let locations = [
          {id: 1, name: 'Москва', country: 'Россия'},
          {id: 2, name: 'Алматы', country: 'Казахстан'},
          {id: 3, name: 'Киев', country: 'Украина'}
        ];

        if (parsedUrl.length > 1) {
          locations = locations.filter(location => {
            if (location.name.toLowerCase().indexOf(parsedUrl[parsedUrl.length - 1].toLowerCase()) > -1) {
              return location;
            }
          });
        }

        connection.mockRespond(new Response(new ResponseOptions({
          status: 200,
          body: locations
        })));

        return;
      }

      if (connection.request.url.indexOf('/users/new') > - 1 && connection.request.method === RequestMethod.Get) {
        const newUsers = [];
        const newUsersCount = parseInt(connection.request.url.split('/users/new/')[1].split('?')[0], 0);

        for (let i = 0; i < newUsersCount; i++) {
          newUsers.push({
            id: 1,
            firstName: 'Олеся',
            age: 23,
            city: 'Москва',
            country: 'Россия',
            thumbnail: '',
            excerpt: '',
            status: 0,
            photoApproved: 0,
            photos: [],
            inTop: 1
          });
        }

        connection.mockRespond(new Response(new ResponseOptions({
          status: 200,
          body: newUsers
        })));

        return;
      }

      if (connection.request.url.indexOf('/users/top') > - 1 && connection.request.method === RequestMethod.Get) {
        const topUsers = [];
        const topUsersCount = parseInt(connection.request.url.split('/users/top/')[1].split('?')[0], 0);

        for (let i = 0; i < topUsersCount; i++) {
          topUsers.push({
            id: 1,
            firstName: 'Олеся',
            age: 23,
            city: 'Москва',
            country: 'Россия',
            thumbnail: '',
            excerpt: '',
            status: 0,
            photoApproved: 0,
            photos: [],
            inTop: 1
          });
        }

        connection.mockRespond(new Response(new ResponseOptions({
          status: 200,
          body: topUsers
        })));

        return;
      }

      if (connection.request.url.indexOf('/users/popular') > - 1 && connection.request.method === RequestMethod.Get) {
        const topUsers = [];

        for (let i = 0; i < 12; i++) {
          topUsers.push({
            id: 1,
            firstName: 'Олеся',
            age: 23,
            city: 'Москва',
            country: 'Россия',
            thumbnail: '',
            excerpt: '',
            status: 0,
            photoApproved: 0,
            photos: [],
            inTop: 1
          });
        }

        connection.mockRespond(new Response(new ResponseOptions({
          status: 200,
          body: topUsers
        })));

        return;
      }

      if (connection.request.url.indexOf('/users/search') > - 1 && connection.request.method === RequestMethod.Get) {
        const topUsers = [];

        for (let i = 0; i < 21; i++) {
          topUsers.push({
            id: 1,
            firstName: 'Олеся',
            age: 23,
            city: 'Anya',
            country: 'Россия',
            thumbnail: '',
            excerpt: '',
            status: 1,
            photoApproved: 0,
            photos: [],
            inTop: 0
          });
        }

        connection.mockRespond(new Response(new ResponseOptions({
          status: 200,
          body: topUsers
        })));

        return;
      }

      if (connection.request.url.indexOf('/user/authenticate') > - 1 && connection.request.method === RequestMethod.Post) {
        connection.mockRespond(new Response(new ResponseOptions({
          status: 200,
          body: {token: '123123drink123123drink123123drink'}
        })));

        return;
      }

      const realHttp = new Http(realBackend, options);
      const requestOptions = new RequestOptions({
        method: connection.request.method,
        headers: connection.request.headers,
        body: connection.request.getBody(),
        url: connection.request.url,
        withCredentials: connection.request.withCredentials,
        responseType: connection.request.responseType
      });

      realHttp.request(connection.request.url, requestOptions)
        .subscribe((response: Response) => {
            connection.mockRespond(response);
          },
          (error: any) => {
            connection.mockError(error);
          });

    }, 500);
  });

  return new Http(backend, options);
}

export const BackendProvider = {
  provide: Http,
    useFactory: BackendMock,
    deps: [MockBackend, BaseRequestOptions, XHRBackend]
};
