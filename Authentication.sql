
drop table UserAuthenticator;
drop table LoginHistoryAuthenticator;

create table UserAuthenticator(
	userId int identity(1,1) primary key,
	email varchar(100) unique,
	[password] varchar(100),
	createdDate datetime default getdate()
);

create table LoginHistoryAuthenticator(
	historyId int identity(1,1) primary key,
	userId int foreign key references UserAuthenticator(userId),
	requestIP varchar(20),
	[timestamp] datetime default getdate(),
	status bit
);


select * from UserAuthenticator;
select * from LoginHistoryAuthenticator;

select GETDATE();
