import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ApiError } from '../types/index.js';

/**
 * API client for making HTTP requests to the ML.io API
 */
export class ApiClient {
  private client: AxiosInstance;
  private apiKey?: string;

  /**
   * Create a new API client
   * @param baseUrl - Base URL for the API
   * @param apiKey - API key for authentication
   */
  constructor(baseUrl: string, apiKey?: string) {
    this.apiKey = apiKey;
    this.client = axios.create({
      baseURL: baseUrl,
      headers: {
        'Content-Type': 'application/json',
        ...(apiKey && { 'X-API-Key': apiKey }),
      },
    });

    // Add response interceptor for error handling
    this.client.interceptors.response.use(
      response => response,
      error => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          const apiError: ApiError = {
            code: error.response.data.code || `HTTP_${error.response.status}`,
            message: error.response.data.message || error.message,
            details: error.response.data.details,
          };
          return Promise.reject(apiError);
        } else if (error.request) {
          // The request was made but no response was received
          const apiError: ApiError = {
            code: 'NETWORK_ERROR',
            message: 'No response received from server',
            details: { request: error.request },
          };
          return Promise.reject(apiError);
        } else {
          // Something happened in setting up the request that triggered an Error
          const apiError: ApiError = {
            code: 'REQUEST_SETUP_ERROR',
            message: error.message,
          };
          return Promise.reject(apiError);
        }
      }
    );
  }

  /**
   * Set the API key for authentication
   * @param apiKey - API key
   */
  public setApiKey(apiKey: string): void {
    this.apiKey = apiKey;
    this.client.defaults.headers['X-API-Key'] = apiKey;
  }

  /**
   * Make a GET request
   * @param url - Request URL
   * @param config - Axios request config
   * @returns Promise with the response data
   */
  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.get(url, config);
    return response.data;
  }

  /**
   * Make a POST request
   * @param url - Request URL
   * @param data - Request body
   * @param config - Axios request config
   * @returns Promise with the response data
   */
  public async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.post(url, data, config);
    return response.data;
  }

  /**
   * Make a PUT request
   * @param url - Request URL
   * @param data - Request body
   * @param config - Axios request config
   * @returns Promise with the response data
   */
  public async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.put(url, data, config);
    return response.data;
  }

  /**
   * Make a PATCH request
   * @param url - Request URL
   * @param data - Request body
   * @param config - Axios request config
   * @returns Promise with the response data
   */
  public async patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.patch(url, data, config);
    return response.data;
  }

  /**
   * Make a DELETE request
   * @param url - Request URL
   * @param config - Axios request config
   * @returns Promise with the response data
   */
  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.delete(url, config);
    return response.data;
  }
}
