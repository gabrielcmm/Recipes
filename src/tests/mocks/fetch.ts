const mockFetch = jest.fn();

const mockJsonPromise = Promise.resolve({ meals: [], drinks: [] });
const mockFetchPromise = Promise.resolve({
  json: () => mockJsonPromise,
  ok: true,
  status: 200,
  statusText: 'OK',
  redirected: false,
  type: 'basic',
  url: '',
  clone: jest.fn(),
  blob: jest.fn(),
  formData: jest.fn(),
  text: jest.fn(),
  arrayBuffer: jest.fn(),
  body: null,
  bodyUsed: false,
  trailer: Promise.resolve(new Headers()),
  headers: new Headers(),
});

mockFetch.mockReturnValue(mockFetchPromise);

export default mockFetch;
