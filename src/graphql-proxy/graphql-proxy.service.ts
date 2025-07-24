import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class GraphqlProxyService {
  private graphqlUrl = process.env.GRAPHQL_URL || 'http://localhost:3007/graphql';

  async forwardQuery(query: string, variables?: any) {
    const response = await axios.post(this.graphqlUrl, {
      query,
      variables,
    });

    return response.data;
  }
}
