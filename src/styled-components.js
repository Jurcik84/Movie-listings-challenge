// styled
import styled from "styled-components";

export const H3 = styled.h3``;

export const H5 = styled.h5``;

export const Row = styled.section`
  display: flex;
  flex-direction: row;
  min-height: 100%;
  height: auto;
  max-width: 1200px;
  margin: 0 auto;
`;

export const Title = styled.h2`
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
`;

export const ListView = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

export const ListViewItem = styled.li`
  margin-bottom: 12px;
  width: 300px;
  margin: 0 8px 8px 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
`;

export const TitleWrapper = styled.div`
  padding: 8px;
`;

export const GenresWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  padding: 8px;
`;

export const Genre = styled.small`
  border: 1px solid #ccc;
  padding: 6px;
  border-radius: 5px;
  margin: 2px;
`;

export const PosterImage = styled.img`
  width: 300px;
`;

export const SideBarView = styled.header`
  background-color: #f1f1f1;
  margin-bottom: 20px;
  padding: 20px;
  color: #000;
`;

export const FooterView = styled.footer`
  display: block;
  min-height: 98px;
  background-color: #000;
  margin-top: 20px;
`;

export const CheckboxLabel = styled.label`
  display: flex;
  justify-content: space-between;
  font-size: 10px;

  padding: 2px 8px;
  margin-bottom: 12px;
  border-radius: 2px;
  display: flex;
  align-items: center;
`;

export const CheckBoxInput = styled.input``;

export const RangeInput = styled.input``;

export const Divider = styled.div`
  display: block;
  height: 1px;
  background-color: #ccc;
`;

export const StatisticDataPanel = styled.section`
  min-height: 98px;
  background-color: #f1f1f1;
  margin-bottom: 20px;
  padding: 20px;
`;

export const MainContentView = styled.section`
  min-height: 98px;
  max-width: 1200px;
  margin: 0 auto;
`;

export const SmallFont = styled.small`
  font-size: 8px;
  display: block;
`;
