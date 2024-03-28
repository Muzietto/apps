import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { GrayInfoBox } from './GrayInfoBox';

describe('GrayInfoBox', () => {
  it('renders content with copy icon', () => {
    const { unmount } = render(<GrayInfoBox withCopy>Test child</GrayInfoBox>);
    const text = screen.getByText('Test child');
    const icon = document.querySelector('svg');

    expect(text).toBeTruthy();
    expect(icon).toBeTruthy();
    unmount();
  });

  it('renders content without copy icon', () => {
    const { unmount } = render(<GrayInfoBox>Test child</GrayInfoBox>);
    const text = screen.getByText('Test child');
    const icon = document.querySelector('svg');

    expect(text).toBeTruthy();
    expect(icon).toBeFalsy();
    unmount();
  });
});
