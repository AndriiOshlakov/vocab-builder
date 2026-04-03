import { NextResponse } from 'next/server';
import { privateApi } from '../../api';
import { logErrorResponse } from '../../_utils/utils';
import { isAxiosError } from 'axios';

export async function GET() {
  try {
    const res = await privateApi.get('/users/current');
    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.status },
      );
    }
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
