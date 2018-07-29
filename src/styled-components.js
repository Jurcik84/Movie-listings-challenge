// styled
import styled from "styled-components";

export const Wrapper = styled.section``;

export const Title = styled.h2`
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
`;

export const ListView = styled.ul`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;

  list-style-type: none;
  margin: 0;
  padding: 0;
`;

export const ListViewItem = styled.li`
  margin-bottom: 12px;
  width: 300px;
  margin: 8px;
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

export const HeaderView = styled.header`
  min-height: 98px;
  background-color: #000;
  margin-bottom: 20px;
`;

export const FooterView = styled.footer`
  min-height: 98px;
  background-color: #000;
  margin-top: 20px;
`;

export const FormView = styled.form`
  color: white;
`;
