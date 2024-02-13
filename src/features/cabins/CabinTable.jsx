import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../../ui/Spinner';
import CabinRow from './CabinRow';
import { getCabins } from '../../services/apiCabins';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

// styled components

const Table = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;

function CabinTable() {
  const { data: cabins, isLoading } = useQuery({
    queryKey: ['cabins'],
    queryFn: getCabins,
  });

  const [searchParam] = useSearchParams();
  const filterValue = searchParam.get('discount') || 'all';

  // State to store filtered cabins
  const [filteredCabin, setFilteredCabins] = useState([]);

  useEffect(() => {
    let filtered = cabins || []; // Default to empty array if cabins is undefined

    if (cabins) {
      if (filterValue === 'no-discount') {
        filtered = cabins.filter((val) => val.discount === 0);
      } else if (filterValue === 'with-discount') {
        filtered = cabins.filter((val) => val.discount > 0);
      }
    }

    setFilteredCabins(filtered); // Update state with filtered or original cabin list
  }, [cabins, filterValue]); // Depend on cabins and filterValue

  if (isLoading) return <Spinner />;
  return (
    <Table role="table">
      <TableHeader role="row">
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </TableHeader>
      {filteredCabin.map((cabin) => (
        <CabinRow key={cabin.id} cabin={cabin} />
      ))}
    </Table>
  );
}

export default CabinTable;
