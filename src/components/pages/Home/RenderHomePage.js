import React, { useState, useEffect } from 'react';
import { SendButton, RespondForm } from '../Surveys/index';
import {
  Layout,
  PageHeader,
  Button,
  Select,
  Divider,
  Modal,
  message,
} from 'antd';
import { UserOutlined, CopyOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { RenderContextQuestions } from '../ContextQuestions/RenderContextQuestions';
import { ResponseList } from '../Responses';
import {
  getCurrentTopic,
  getCurrentRequest,
} from '../../../state/actions/apolloActions';
import { TopicNav } from '../TopicNav';
import { getTopicById, getRequestById } from '../../../api/index';

const { Content } = Layout;
const { Option } = Select;

function RenderHomePage(props) {
  const { authService, currentTopic } = props;

  const copyJoinCode = joincode => {
    navigator.clipboard.writeText(joincode);
    message.info('Copied!');
  };

  return (
    <>
      <Layout style={{ height: '100vh' }}>
        <TopicNav />
        <Layout>
          <PageHeader
            className="header"
            title={<h1>Apollo</h1>}
            subTitle={`Hello, ${props.userInfo.name}`}
            style={{
              padding: '2rem',
            }}
            extra={[
              // this is the user profile icon
              <UserOutlined
                key="4"
                style={{
                  fontSize: '30px',
                  border: '1px solid #191919',
                  borderRadius: '2rem',
                  padding: '.5rem',
                }}
              />,
              <Modal></Modal>,
              <Button
                key="3"
                onClick={() => authService.logout()}
                style={{
                  border: '1px solid #191919',
                  color: '#191919',
                  fontWeight: 'bold',
                  borderRadius: '1rem',
                }}
              >
                Sign Out
              </Button>,
            ]}
          ></PageHeader>
          <Layout
            style={{
              display: 'flex',
              flexFlow: 'row',
            }}
          >
            <Content
              style={{
                textAlign: 'left',
                marginLeft: '2rem',
                width: '30%',
                overflow: 'scroll',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                  marginBottom: '2rem',
                }}
              >
                <h2
                  style={{
                    textAlign: 'left',
                    fontSize: '2rem',
                    fontWeight: 'bold',
                  }}
                >
                  {props.currentTopic && props.currentTopic.title}
                </h2>
                <Button
                  style={{
                    backgroundColor: 'indigo',
                    color: 'white',
                    fontWeight: 'bold',
                  }}
                  onClick={() => {
                    copyJoinCode(props.currentTopic.joincode);
                  }}
                >
                  <CopyOutlined />
                  {props.currentTopic && props.currentTopic.joincode}
                </Button>
              </div>

              <Select
                style={{ padding: '0' }}
                placeholder={props.currentRequest.createdDate}
                dropdownRender={menu => (
                  <div style={{ padding: '0' }}>
                    {currentTopic.surveysrequests &&
                      currentTopic.surveysrequests.map((request, index) => {
                        return (
                          <Button
                            key={request.surveyid}
                            style={{
                              margin: '0',
                              width: '100%',
                              height: '100%',
                            }}
                            onClick={() => {
                              getRequestById(
                                request.surveyid,
                                props.getCurrentRequest
                              );
                            }}
                          >
                            {request.createdDate}
                          </Button>
                        );
                      })}
                  </div>
                )}
              ></Select>
              {props.currentTopic.owner &&
                props.currentTopic.owner.username === props.userInfo.email && (
                  <SendButton />
                )}
              <h3 style={{ textAlign: 'left' }}>CONTEXT</h3>
              {props.currentRequest ? (
                <RenderContextQuestions survey={props.currentRequest} />
              ) : (
                <></>
              )}
            </Content>
            <Content
              style={{
                width: '70%',
                display: 'flex',
                justifyContent: 'center',
                overflow: 'scroll',
              }}
            >
              {props.currentTopic.owner &&
                props.currentTopic.owner.username !== props.userInfo.email &&
                !props.currentRequest.responded && (
                  <RespondForm currentRequest={props.currentRequest} />
                )}
              {props.currentRequest &&
                props.currentRequest.questions &&
                props.currentRequest.responded && <ResponseList />}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
}

const mapStateToProps = state => {
  return {
    userInfo: state.userInfo,
    topics: state.topics,
    currentTopic: state.currentTopic,
    currentRequest: state.currentRequest,
  };
};

export default connect(mapStateToProps, { getCurrentTopic, getCurrentRequest })(
  RenderHomePage
);
