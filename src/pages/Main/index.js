import React, { Component } from "react";

import { FaGithubAlt, FaPlus, FaSpinner } from "react-icons/fa";

import { Link } from "react-router-dom";

import api from "../../services/api";
import Container from "../../components/container";
import { Form, SubmitButton, List } from "./styles";

class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newRepo: "",
            repositories: [],
            loading: false,
        };
    }

    /**
     * Carregar os dados do localstorage
     */
    componentDidMount() {
        const repositories = localStorage.getItem("repositories");

        if (repositories) {
            this.setState({ repositories: JSON.parse(repositories) });
        }
    }

    /**
     * Salva os dados no localstorage
     */
    componentDidUpdate(_, prevState) {
        const { repositories } = this.state;
        if (prevState.repositories !== repositories) {
            localStorage.setItem("repositories", JSON.stringify(repositories));
        }
    }

    handleInputChange = (e) => {
        this.setState({ newRepo: e.target.value });
    };

    handleSubmit = async (e) => {
        e.preventDefault();

        this.setState({ loading: true });

        const { newRepo, repositories } = this.state;

        const response = await api.get(`/repos/${newRepo}`);

        const data = {
            name: response.data.full_name,
        };

        this.setState({
            repositories: [...repositories, data],
            newRepo: "",
            loading: false,
        });
    };

    render() {
        const { newRepo, loading, repositories } = this.state;

        return (
            <Container>
                <h1>
                    <FaGithubAlt />
                    Repositórios
                </h1>

                <Form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        placeholder="Adicionar repositório"
                        value={newRepo}
                        onChange={this.handleInputChange}
                    />

                    <SubmitButton loading={loading}>
                        {loading ? (
                            <FaSpinner color="#FFFFFF" size={14} />
                        ) : (
                            <FaPlus color="#FFFFFF" size={14} />
                        )}
                    </SubmitButton>
                </Form>

                <List>
                    {repositories.map((item) => (
                        <li key={item.name}>
                            <span>{item.name}</span>
                            <Link
                                to={`/repository/${encodeURIComponent(
                                    item.name
                                )}`}
                            >
                                Detalhes
                            </Link>
                        </li>
                    ))}
                </List>
            </Container>
        );
    }
}

export default Main;
