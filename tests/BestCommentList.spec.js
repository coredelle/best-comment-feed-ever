import { shallowMount } from '@vue/test-utils';
import BestCommentList from '@/components/BestCommentList.vue';
import io from 'socket.io-mock';
import { Api } from '@/api';

jest.mock('@/api', () => ({
  Api: {
    get: jest.fn(),
  },
}));

describe('BestCommentList.vue', () => {
  let socket;

  beforeEach(() => {
    socket = new io();
  });

  it('renders correctly', () => {
    const wrapper = shallowMount(BestCommentList, {
      global: {
        mocks: {
          $socket: socket,
        },
      },
    });
    expect(wrapper.exists()).toBe(true);
  });
});
