import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { InformationalTables } from './InformationalTables';

describe('InformationalTables', () => {
  it('renders content', () => {
    render(<InformationalTables />);
    const table = screen.getAllByTestId('info-table');
    const link = screen.getByText('incoming links to entry by');

    expect(table).toHaveLength(2);
    expect(link).toBeTruthy();
  });
});
