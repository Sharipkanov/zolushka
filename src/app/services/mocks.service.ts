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
