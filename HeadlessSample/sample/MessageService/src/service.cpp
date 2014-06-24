/*
 * Copyright (c) 2013 BlackBerry Limited.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

#include "service.hpp"

void myMessageHandler(QtMsgType type, const char *msg) {
	if (!QString(msg).contains("##")) {
		return;
	}
	QString logTime = QDateTime::currentDateTime().toString("[hh:mm::ss] ");
	QString txt;
	switch (type) {
	case QtDebugMsg:
		txt = logTime + QString("Headless: %1").arg(msg);
		break;
	}
	QFile outFile("data/log.txt");
	if (outFile.size() > 1000000) {
		outFile.remove();
		QFile outFile("data/log.txt");
		outFile.open(QIODevice::WriteOnly | QIODevice::Append);
		QTextStream ts(&outFile);
		ts << txt << endl;
		outFile.close();
	} else {
		outFile.open(QIODevice::WriteOnly | QIODevice::Append);
		QTextStream ts(&outFile);
		ts << txt << endl;
		outFile.close();
	}
}

HService::HService(bb::Application * app) :
		QObject(app) {
	QTimer::singleShot(0, this, SLOT(init()));
}

void HService::init() {
	m_accountService = new AccountService();
	m_accountService->setParent(this);
	m_messageService = new MessageService(this);

	QFile outFile("data/log.txt");
	outFile.remove();
	qInstallMsgHandler(myMessageHandler);

	qDebug() << "## Starting message service..";
	bool connected = false;
	connected = connect(m_messageService, SIGNAL(messageAdded(bb::pim::account::AccountKey, bb::pim::message::ConversationKey, bb::pim::message::MessageKey)), this, SLOT(messageAdded(bb::pim::account::AccountKey, bb::pim::message::ConversationKey, bb::pim::message::MessageKey)));
	qDebug() << "## Connected messageAdded: " << connected;
	connected = connect(m_messageService, SIGNAL(messagesAdded(bb::pim::account::AccountKey, QList<bb::pim::message::ConversationKey>, QList<bb::pim::message::MessageKey>)), this, SLOT(messagesAdded(bb::pim::account::AccountKey, QList<bb::pim::message::ConversationKey>, QList<bb::pim::message::MessageKey>)));
	qDebug() << "## Connected messagesAdded: " << connected;
	connected = connect(m_messageService, SIGNAL(bodyDownloaded(bb::pim::account::AccountKey, bb::pim::message::MessageKey)), this, SLOT(bodyDownloaded(bb::pim::account::AccountKey, bb::pim::message::MessageKey)));
	qDebug() << "## Connected bodyDownloaded: " << connected;
	connected = connect(m_messageService, SIGNAL(messageUpdated(bb::pim::account::AccountKey, bb::pim::message::ConversationKey, bb::pim::message::MessageKey, bb::pim::message::MessageUpdate)), this, SLOT(messageUpdated(bb::pim::account::AccountKey, bb::pim::message::ConversationKey, bb::pim::message::MessageKey, bb::pim::message::MessageUpdate)));
	qDebug() << "## Connected messageUpdated: " << connected;
	connected = connect(m_messageService, SIGNAL(messageRemoved (bb::pim::account::AccountKey, bb::pim::message::ConversationKey, bb::pim::message::MessageKey, QString)), this, SLOT(messageRemoved (bb::pim::account::AccountKey, bb::pim::message::ConversationKey, bb::pim::message::MessageKey, QString)));
	qDebug() << "## Connected messageRemoved: " << connected;
	connected = connect(m_accountService, SIGNAL(accountsChanged(bb::pim::account::AccountsChanged)), this, SLOT(accountsChanged(bb::pim::account::AccountsChanged)));
	qDebug() << "## Connected accountsChanged: " << connected;

	qDebug() << "## Message service started.";
	QList<Account> accounts = m_accountService->accounts(Service::Messages);
	qDebug() << "## Messaging Accounts Found: " << accounts.length();

	for (int i = 0; i < accounts.length(); i++) {
		qDebug() << "## " << (i + 1) << ": " << accounts.at(i).id() << " | " << accounts.at(i).provider().name();
	}
}

void HService::messageRemoved(bb::pim::account::AccountKey accountId, bb::pim::message::ConversationKey convId, bb::pim::message::MessageKey msgId, QString sourceId) {
	qDebug() << "## messageRemoved: " << accountId << ", " << convId << ", " << msgId << ", " << sourceId;
}

void HService::bodyDownloaded(bb::pim::account::AccountKey accountKey, bb::pim::message::MessageKey messageKey) {
	qDebug() << "## bodyDownloaded: " << accountKey << ", " << messageKey;
}

void HService::messagesAdded(bb::pim::account::AccountKey accKey, QList<bb::pim::message::ConversationKey> convKeys, QList<bb::pim::message::MessageKey> msgKeys) {
	qDebug() << "## messagesAdded: " << msgKeys.count();
	for (int i = 0; i < msgKeys.count(); i++) {
		messageAdded(accKey, convKeys.at(i), msgKeys.at(i));
	}
	qDebug() << "## END messagesAdded: " << msgKeys.count();
}

void HService::messageAdded(bb::pim::account::AccountKey accountKey, bb::pim::message::ConversationKey conversationKey, bb::pim::message::MessageKey messageKey) {
	qDebug() << "## messageAdded: " << accountKey << ", " << conversationKey << ", " << messageKey;
}

void HService::messageUpdated(bb::pim::account::AccountKey accountKey, bb::pim::message::ConversationKey conversationKey, bb::pim::message::MessageKey messageKey, bb::pim::message::MessageUpdate update) {
	qDebug() << "##messageUpdated: " << accountKey << ", " << conversationKey << ", " << messageKey;
}

void HService::accountsChanged(bb::pim::account::AccountsChanged changes) {
	QList<AccountKey> accounts = changes.connectedAccountIds();
	if (accounts.length() > 0) {
		qDebug() << "## connected accounts: " << accounts;
	}

	accounts = changes.createdAccountIds();
	if (accounts.length() > 0) {
		qDebug() << "## created accounts: " << accounts;

	}

	accounts = changes.deletedAccountIds();
	if (accounts.length() > 0) {
		qDebug() << "## deleted accounts " << accounts;
	}

	accounts = changes.invalidatedAccountIds();
	if (accounts.length() > 0) {
		qDebug() << "## invalidated accounts " << accounts;
	}

	accounts = changes.syncStartedAccountIds();
	if (accounts.length() > 0) {
		qDebug() << "## syncStarted accounts " << accounts;
	}

	accounts = changes.syncedAccountIds();
	if (accounts.length() > 0) {
		qDebug() << "## synced accounts " << accounts;
	}

	accounts = changes.updatedAccountIds();
	if (accounts.length() > 0) {
		qDebug() << "## updated accounts " << accounts;
	}
}
