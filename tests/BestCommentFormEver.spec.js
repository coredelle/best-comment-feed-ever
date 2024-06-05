import { shallowMount } from '@vue/test-utils';
import BestCommentFormEver from '@/components/BestCommentFormEver.vue';
import io from 'socket.io-mock';

describe('BestCommentFormEver.vue', () => {
  let socket;

  beforeEach(() => {
    socket = new io();
  });

  it('renders properly', () => {
    const wrapper = shallowMount(BestCommentFormEver);
    expect(wrapper.exists()).toBe(true);
  });

  it('has form with input and textarea', () => {
    const wrapper = shallowMount(BestCommentFormEver);
    const input = wrapper.find('input');
    const textarea = wrapper.find('textarea');
    expect(input.exists()).toBe(true);
    expect(textarea.exists()).toBe(true);
  });
});
