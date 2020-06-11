import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Input from 'components/atoms/Input/Input';
import Heading from 'components/atoms/Heading/Heading';
import Paragraph from 'components/atoms/Paragraph/Paragraph';
import UserPageTemplate from 'templates/UserPageTemplate';
import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
import plusIcon from 'assets/icons/plus.svg';
import withContext from 'hoc/withContext';
import NewItemPanel from 'components/organisms/NewItemPanel/NewItemPanel';
import emptyStateImg from 'assets/images/emptyState.png';
import Notification from 'components/molecules/Notification/Notification';
import { motion } from 'framer-motion';

const Wrapper = styled.div`
  position: relative;
  padding: 25px 150px 25px 70px;
  overflow: hidden;
`;

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 45px;
  @media (min-width: 1100px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1500px) {
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 85px;
  }
`;

const PageHeader = styled.div`
  margin: 25px 0 50px 0;
`;

const StyledHeading = styled(Heading)`
  margin: 25px 0 0 0;
  text-transform: capitalize;
`;

const StyledParagraph = styled(Paragraph)`
  margin: 0;
  font-weight: ${({ theme }) => theme.bold};
`;

const StyledAddButton = styled(ButtonIcon)`
  position: fixed;
  bottom: 40px;
  right: 40px;
  z-index: 11;
  background-size: 35%;
  background-color: ${({ theme, activecolor }) => theme[activecolor]};
  border-radius: 50%;
  transform: ${({ isPanelVisible }) =>
    isPanelVisible ? 'rotate(45deg)' : 'rotate(0)'};
  &:hover {
    background-color: ${({ theme, activecolor }) => theme[`${activecolor}100`]};
    opacity: 0.8;
  }
`;

const EmptyStateWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  opacity: 0.7;
`;

const EmptyState = styled.div`
  width: 400px;
  height: 350px;
  background: url(${emptyStateImg}) no-repeat center;
  background-size: 100%;
`;

const StyledEmptyHeading = styled(Heading)`
  margin: 20px 0 0;
`;

class GridTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPanelVisible: false,
    };
  }

  handlePanelVisibility = () => {
    this.setState(prevState => ({
      isPanelVisible: !prevState.isPanelVisible,
    }));
  };

  render() {
    const { pageContext, children } = this.props;
    const { isPanelVisible } = this.state;
    return (
      <UserPageTemplate>
        <Wrapper>
          <Notification />
          <motion.div
            transition={{ duration: 0.3 }}
            initial={{ opacity: 0, y: '-10vh' }}
            animate={{ opacity: 1, y: '0' }}
            exit={{ opacity: 0, y: '-10vh' }}
          >
            <PageHeader>
              <Input search placeholder="Search" activecolor={pageContext} />
              <StyledHeading big as="h1">
                {pageContext}
              </StyledHeading>
              {children.length !== 0 && (
                <StyledParagraph>
                  {children.length} {pageContext}
                </StyledParagraph>
              )}
            </PageHeader>
          </motion.div>
          <motion.div
            transition={{ duration: 0.8 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {children.length === 0 ? (
              <EmptyStateWrapper>
                <EmptyState />
                <StyledEmptyHeading>
                  It&apos;s empty in here..
                </StyledEmptyHeading>
                <Paragraph>
                  Go and add some {pageContext}! They won&apos;t go anywhere.
                </Paragraph>
              </EmptyStateWrapper>
            ) : (
              <GridWrapper>{children}</GridWrapper>
            )}
          </motion.div>
          <StyledAddButton
            isPanelVisible={isPanelVisible}
            onClick={this.handlePanelVisibility}
            icon={plusIcon}
            activecolor={pageContext}
          />
          <NewItemPanel
            handleClosePanel={() => this.handlePanelVisibility()}
            isVisible={isPanelVisible}
          />
        </Wrapper>
      </UserPageTemplate>
    );
  }
}

GridTemplate.propTypes = {
  pageContext: PropTypes.oneOf(['notes', 'twitters', 'articles']),
  message: PropTypes.shape({
    status: PropTypes.number,
    content: PropTypes.string,
  }),
  children: PropTypes.arrayOf(PropTypes.object).isRequired,
};

GridTemplate.defaultProps = {
  pageContext: 'notes',
  message: {
    status: null,
    content: null,
  },
};

export default withContext(GridTemplate);